import {
	Resolver,
	Query,
	FieldResolver,
	Root,
	Int,
	Arg,
	Mutation,
	InputType,
	Field
} from "type-graphql";
import "reflect-metadata";
import { Production } from "../entities/production";
import { Product } from "../entities/product";

@InputType()
class ProductInput {
	@Field(() => [Int])
	quantity: number[];

	@Field(() => [Int])
	productId: number[];
}

@Resolver(Production)
export class ProductionResolver {
	@FieldResolver(() => Product)
	product(@Root() production: Production) {
		return Product.findOne(production.productId);
	}

	@Query(() => [Production])
	async getProductsInProgress(): Promise<Production[]> {
		return Production.find();
	}

	@Mutation(() => [Production])
	async createProduct(
		@Arg("productInput", () => ProductInput) productInput: ProductInput
	): Promise<Production[]> {
		const products: Production[] = [];
		for (var i = 0; i < productInput.productId.length; i++) {
			const quant = productInput.quantity[i];
			const productId = productInput.productId[i];
			products.push(
				await Production.create({
					quantity: quant,
					productId: productId
				}).save()
			);
		}
		return await products;
	}
}
