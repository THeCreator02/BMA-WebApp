import { registerEnumType } from "type-graphql";

export enum UserRole {
	DEFAULT = "worker",
	JANITOR = "janitor",
	MANAGER = "manager",
	CEO = "ceo",
	CTO = "cto"
}
registerEnumType(UserRole, {
	name: "UserRole",
	description: "Positions available at BMA"
});
