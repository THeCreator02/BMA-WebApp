import { registerEnumType } from "type-graphql";

export enum BottleTypes {
	Glass = "GREEN MARASCA GLASS BOTTLE",
	Pet = "PET PLASTIC BOTTLE",
	Tin = "TIN CAN",
	FStyle = "F-STYLE PLASTIC JUG",
	GlassJug = "ROUND GLASS JUG",
	Chubby = "CHUBBY GLASS BOTTLE",
	Bertolli = "CLEAR GLASS BERTOLLI BOTTLE"
}
registerEnumType(BottleTypes, {
	name: "BottleTypes",
	description: "Bottle Types for Oils sold at BMA USA inc."
});
