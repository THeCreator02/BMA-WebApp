import { isAuth } from "./../middleware/isAuth";
import { MyContext } from "./../types";
import { Post } from "./../entities/post";
import "reflect-metadata";
//Need or else everything breaks
import {
	Resolver,
	Query,
	Arg,
	Int,
	Mutation,
	InputType,
	Field,
	Ctx,
	UseMiddleware,
	FieldResolver,
	Root
} from "type-graphql";
import { getConnection } from "typeorm";

@InputType()
class PostInput {
	@Field()
	title: string;
	@Field()
	text: string;
}

@Resolver(Post)
export class PostResolver {
	@FieldResolver(() => String)
	textSnippet(@Root() root: Post) {
		return root.text.slice(0, 75) + "...";
	}
	//Get all posts in a list
	@Query(() => [Post])
	async posts(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null
	): Promise<Post[]> {
		const realLimit = Math.min(50, limit);
		const allPosts = getConnection()
			.getRepository(Post)
			.createQueryBuilder("p")
			.orderBy('"createdOn"', "DESC")
			.take(realLimit);
		if (cursor) {
			allPosts.where('"createdOn" < :cursor', {
				cursor: new Date(parseInt(cursor))
			});
		}
		return allPosts.getMany();
	}

	//Search for a post based on Id
	@Query(() => Post, { nullable: true })
	async post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
		return Post.findOne(id);
	}

	//For creating a new post
	@Mutation(() => Post)
	@UseMiddleware(isAuth)
	async createPost(
		@Arg("input") input: PostInput,
		@Ctx() { req }: MyContext
	): Promise<Post> {
		return Post.create({ ...input, userId: req.session.userId }).save();
	}

	//For updating an existing post
	@Mutation(() => Post, { nullable: true })
	async updatePost(
		@Arg("id", () => Int) id: number,
		@Arg("title", () => String, { nullable: true }) title: string
	): Promise<Post | undefined> {
		const post = await Post.findOne(id);
		if (!post) {
			return undefined;
		}
		if (typeof title !== "undefined") {
			await Post.update({ id }, { title });
		}
		return post;
	}

	//For deleting post
	@Mutation(() => Boolean)
	async deletePost(@Arg("id", () => Int) id: number): Promise<boolean> {
		await Post.delete(id);
		return true;
	}
}
