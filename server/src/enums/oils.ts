import { registerEnumType } from "type-graphql";

export enum Oils {
	EVOO = "Extra Virgin Olive Oil",
	OEVOO = "Organic Extra Virgin Olive Oil",
	GSO = "Grape Seed Oil",
	SUNFLOWER = "Sunflower Oil",
	CANOLA = "Canola Oil",
	SAFFLOWER = "Safflower Oil",
	POMACE = "Pomace Olive Oil",
	PUREOLIVE = "Pure Olive Oil",
	AVOCADO = "Avocado Oil",
	ALOMOND = "Almond Oil",
	FLAXSEED = "Flaxseed Oil",
	SESAME = "Sesame Oil",
	WALNUT = "Walnut Oil",
	PEANUT = "Peanut Oil",
	BALSAMIC = "Balsamic Vinegar",
	RICEBRAN = "Rice Bran Oil"
}
registerEnumType(Oils, {
	name: "Oils",
	description: "Oils sold at BMA USA Inc."
});
