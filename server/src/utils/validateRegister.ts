import { minimumLength } from "./../constants";
import { UserAndPassword } from "../resolvers/UserAndPassword";

export const validateRegister = (options: UserAndPassword) => {
	if (options.username.length <= minimumLength) {
		return [
			{
				field: "username",
				message: `username is too short must be greater then ${minimumLength} characters`
			}
		];
	}
	if (options.email.length <= minimumLength) {
		return [
			{
				field: "email",
				message: `email is too short must be greater then ${minimumLength} characters`
			}
		];
	}
	if (!options.email.includes("@")) {
		return [
			{
				field: "email",
				message: "Invalid email missing '@' symbol"
			}
		];
	}
	if (options.username.includes("@")) {
		return [
			{
				field: "username",
				message: "username cannot include '@' symbol"
			}
		];
	}
	if (options.password.length <= minimumLength) {
		return [
			{
				field: "password",
				message: `invalid password must be minimum ${minimumLength} characters`
			}
		];
	}
	return null;
};
