import { registerEnumType } from "type-graphql";

export enum Brands {
	MG = "MG",
	MassimoGusto = "Massimo Gusto",
	Milano = "Milano Plus",
	Private = "Private Label",
	Romanino = "Romanino",
	Oliverda = "Oliverda-Sana",
	Venice = "Venice",
	ViaVeneto = "Via Veneto",
	Viapia = "Viapia",
	AleppoCastle = "Aleppo Castle",
	Bulk = "Bulk"
}
registerEnumType(Brands, {
	name: "Brands",
	description: "Brands sold at BMA USA inc."
});
