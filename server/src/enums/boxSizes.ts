import { registerEnumType } from "type-graphql";

export enum BoxSizes {
	HalfDozenTwoLiter = "6x2 Liter",
	DozenLiter = "12x1 Liter",
	HalfDozenHalfLiter = "6x500 Mililiter",
	DozenHalfLiter = "12x500 Mililiter",
	HalfDozenGallons = "6x1 Gallon",
	Jug = "4x2.85 Liter",
	DozenThirdLiter = "12x750 Mililiter",
	DozenQuarterLiter = "12x250 Mililiter"
}
registerEnumType(BoxSizes, {
	name: "BoxSizes",
	description: "Box Sizes for Oils sold at BMA USA inc."
});
