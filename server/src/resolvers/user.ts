import { minimumLength } from "./../constants";
import { validateRegister } from "./../utils/validateRegister";
import { UserAndPassword } from "./UserAndPassword";
import { User } from "./../entities/user";
import { MyContext } from "./../types";
import {
	Resolver,
	Mutation,
	Arg,
	Field,
	Ctx,
	ObjectType,
	Query,
	Int,
	FieldResolver,
	Root
} from "type-graphql";
import "reflect-metadata";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";

@ObjectType()
class FieldError {
	@Field()
	field: string;

	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver(User)
export class UserResolver {
	@FieldResolver(() => String)
	email(@Root() user: User, @Ctx() { req }: MyContext) {
		if (req.session.userId === user.id) {
			return user.email;
		}
		return "";
	}

	@Query(() => User, { nullable: true })
	me(@Ctx() { req }: MyContext) {
		if (!req.session.userId) {
			return null;
		}
		return User.findOne(req.session.userId);
	}

	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg("email") email: string,
		@Ctx() { redis }: MyContext
	) {
		const user = await User.findOne({ where: { email: email } });

		if (!user) {
			return false;
		}

		const token = v4();
		const key = FORGET_PASSWORD_PREFIX + token;
		await redis.set(
			FORGET_PASSWORD_PREFIX + token,
			user.id,
			"ex",
			1000 * 60 * 60 * 24 //One day
		);

		await sendEmail(
			email,
			`<a href='http://localhost:3000/reset-password/${token}'>Reset Password</a>`
		);

		return user.id.toString() == (await redis.get(key));
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg("options") options: UserAndPassword,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const errors = validateRegister(options);
		let user;
		if (errors) {
			return { errors };
		}
		try {
			user = await User.create({
				username: options.username,
				email: options.email,
				password: await argon2.hash(options.password)
			}).save();
		} catch (err) {
			if (err.code === "23505") {
				return {
					errors: [
						{
							field: "username",
							message: "username is taken"
						}
					]
				};
			}
		}
		req.session.userId = user?.id;
		if (!user) {
			return {
				errors: [
					{ field: "username", message: "User cannot be created" }
				]
			};
		}
		return { user };
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg("usernameOrEmail") usernameOrEmail: string,
		@Arg("password") password: string,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const user = await User.findOne(
			usernameOrEmail.includes("@")
				? { where: { email: usernameOrEmail } }
				: { where: { username: usernameOrEmail } }
		);
		if (!user) {
			return {
				errors: [
					{
						field: "usernameOrEmail",
						message: "User does not exist"
					}
				]
			};
		}
		const valid = await argon2.verify(user.password, password);

		if (!valid) {
			return {
				errors: [
					{
						field: "password",
						message: "password does not match"
					}
				]
			};
		}
		req.session.userId = user.id;
		return { user };
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise((resolve) =>
			req.session.destroy((err) => {
				res.clearCookie(COOKIE_NAME);
				if (err) {
					console.log(err);
					resolve(false);
					return;
				}

				resolve(true);
			})
		);
	}
	@Mutation(() => UserResponse)
	async changePassword(
		@Arg("token") token: string,
		@Arg("newPassword") newPassword: string,
		@Ctx() { redis, req }: MyContext
	): Promise<UserResponse> {
		if (newPassword.length <= minimumLength) {
			return {
				errors: [
					{
						field: "newPassword",
						message: `password must be greater than ${minimumLength} characters`
					}
				]
			};
		}

		const key = FORGET_PASSWORD_PREFIX + token;
		const userId = await redis.get(key);

		if (!userId) {
			return {
				errors: [
					{
						field: "token",
						message: "token expired"
					}
				]
			};
		}
		const user = await User.findOne(parseInt(userId));

		if (!user) {
			return {
				errors: [
					{
						field: "token",
						message: "User no longer exists"
					}
				]
			};
		}

		await User.update(
			{ id: user.id },
			{ password: await argon2.hash(newPassword) }
		);

		redis.del(key);

		//Login user after resetting password
		req.session.userId = user.id;

		return { user };
	}
	@Query(() => User)
	async getUser(@Arg("id", () => Int) id: number): Promise<User | undefined> {
		return await User.findOne(id);
	}
}
