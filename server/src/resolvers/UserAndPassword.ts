import { InputType, Field } from "type-graphql";
import "reflect-metadata";

@InputType()
export class UserAndPassword {
	@Field()
	email: string;

	@Field()
	username: string;

	@Field()
	password: string;
}
