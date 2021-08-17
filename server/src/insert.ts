import { FormulaProperties } from "./utils/formula";
import fs from "fs";
import path from "path";
import { Brands } from "./enums/brands";
import { Oils } from "./enums/oils";
import { Flavors } from "./enums/flavors";
// import { BoxSizes } from "./enums/boxSizes";
// import { Product } from "./entities/product";
// import { BottleSizes } from "./enums/bottleSizes";
import { Order } from "./entities/order";
import { Customer } from "./entities/customer";
import { User } from "./entities/user";
import { Product } from "./entities/product";

export const addCustomers = async (filename: string) => {
	fs.readFile(
		path.join("./src/json/", filename),
		"utf-8",
		(_, file: string) => {
			JSON.parse(file).map((file: any) => {
				Customer.create({
					name: file.name,
					email: file.email,
					phoneNumber: file.phoneNumber,
					zipcode: file.zipcode,
					address: file.address,
					city: file.city,
					orderIds: []
				}).save();
			});
		}
	);
};

export const insert = async (fileName: string) => {
	const oils = Object.values(Oils);
	const flavors = Object.values(Flavors);
	fs.readFile(
		path.join("./src/json/", fileName),
		"utf-8",
		(_, file: string) => {
			JSON.parse(file).map((file: any) => {
				const holder: FormulaProperties[] = [];
				if (file.name.includes(Brands.MG)) {
					console.log("Brand: " + Brands.MG);
					console.log("Name: " + file.name);
					console.log("Barcode: " + file.barcode);
					console.log("Item Code: " + file.itemcode);
					console.log("Case Size: " + file.caseSize);
					console.log("is Fusion: " + file.isFusion);
					console.log("is Blend: " + file.isBlend);
					console.log("Bottle Size: " + file.bottleSize);
					console.log("Box Size: " + file.boxType);
					oils.map((oil) => {
						if (file.name.includes(oil)) {
							if (
								!file.name.includes("Organic") ||
								!oil.includes("Organic")
							) {
								holder.push({ name: oil, percentage: 1.0 });
							}
							if (
								file.name.includes("Organic") &&
								oil.includes("Organic")
							) {
								holder[0] = { name: oil, percentage: 1.0 };
							}
						}
					});
					flavors.map((flavor) => {
						if (file.name.includes(flavor)) {
							holder.push({ name: flavor, percentage: 0.02 });
						}
					});
					if (holder.length > 1) {
						holder[0].percentage -= holder[1].percentage;
					}
					console.log(holder);
					Product.create({
						brand: Brands.MG,
						name: file.name,
						barcode: file.barcode,
						itemCode: file.itemcode,
						caseSize: file.caseSize,
						isBlend: file.isBlend,
						isFusion: file.isFusion,
						bottleSize: file.bottleSize,
						boxSize: file.boxType,
						formula: holder
					}).save();
				}
			});
		}
	);
};

export const add = async () => {
	const customer = await Customer.findOne(1);
	const user = await User.findOne(1);
	const item1 = await Product.findOne(21);
	const item2 = await Product.findOne(2);
	const order = new Order();
	order.customerId = customer?.id;
	order.userId = user?.id;
	order.productIds = [item1?.id, item2?.id];
	Order.create(order).save();
};
