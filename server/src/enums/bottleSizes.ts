import { registerEnumType } from "type-graphql";
//Weight of Product (Not given in ML must convert)
const DrumWeight = 420;
const ToteWeight = 2100;
const JugInBoxWeight = 35;
//Rate of lb per ml
const poundsPerMililiter = 0.00202;

export enum BottleSizes {
	//Name of Size = Amount in Mililiter
	Gallon = 3785.41,
	TwoLiter = 2000,
	OneLiter = 1000,
	HalfLiter = 500,
	TwoThirdLiter = 750,
	Jug = 2850,
	QuarterLiter = 250,
	Tote = ToteWeight * poundsPerMililiter,
	Drum = DrumWeight * poundsPerMililiter,
	JugInBox = JugInBoxWeight * poundsPerMililiter
}
registerEnumType(BottleSizes, {
	name: "BottleSizes",
	description: "Bottle Sizes of product sold at BMA USA inc."
});
