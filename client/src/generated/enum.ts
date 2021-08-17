//Weight of Product (Not given in ML must convert)
const DrumWeight = 420;
const ToteWeight = 2100;
const JugInBoxWeight = 35;
//Rate of lb per ml
const poundsPerMililiter = 0.00202;
/** Bottle Sizes of product sold at BMA USA inc. */
export enum BottleSizes {
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

/** Box Sizes for Oils sold at BMA USA inc. */
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
