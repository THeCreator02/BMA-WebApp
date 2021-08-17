import { registerEnumType } from "type-graphql";

export enum Flavors {
	Garlic = "Garlic",
	Jalapeno = "Jalapeno",
	WhiteTruffle = "White Truffle",
	BlackTruffle = "Black Truffle",
	Basil = "Basil",
	Lemon = "Lemon",
	Lime = "Lime",
	Orange = "Orange",
	Rosemary = "Rosemary"
}
registerEnumType(Flavors, {
	name: "Flavors",
	description: "Flavors available at BMA USA Inc."
});
