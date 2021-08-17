import { registerEnumType } from "type-graphql";

export enum BoxTypes {
	Milano = "MILANO PLUS PRINTED",
	MG = "MG PRINTED",
	MassimoGusto = "MASSIMO GUSTO PRINTED",
	WhitePlain = "WHITE PLAIN",
	BrownPlain = "BROWN PLAIN",
	DisplayMilano = "DISPLAY MILANO PLUS PRINTED",
	DisplayMassimoGusto = "DISPLAY MASSIMO GUSTO PRINTED"
}
registerEnumType(BoxTypes, {
	name: "BoxTypes",
	description: "Box Types for Oils sold at BMA USA inc."
});
