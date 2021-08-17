import { Flavors } from "../enums/flavors";
import { Oils } from "../enums/oils";

export interface FormulaProperties {
	name: Oils | Flavors; //Material name Ex: Grape Seed Oil
	percentage: number; //Material percentage, Stored as float Ex: 0.1
}
