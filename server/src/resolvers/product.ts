import { Resolver, Query, Arg, Int } from "type-graphql";
import "reflect-metadata";
import { getConnection } from "typeorm";
import { Product } from "../entities/product";

@Resolver()
export class ProductResolver {
	@Query(() => [Product], { nullable: true })
	async products(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null
	): Promise<Product[]> {
		const realLimit = Math.min(50, limit);
		const allProducts = getConnection()
			.getRepository(Product)
			.createQueryBuilder("p")
			.orderBy('"createdOn"', "ASC")
			.take(realLimit);
		if (cursor) {
			allProducts.where('"createdOn" < :cursor', {
				cursor: new Date(parseInt(cursor))
			});
		}
		return await allProducts.getMany();
	}

	@Query(() => [Product], { nullable: true })
	async allProducts(): Promise<Product[]> {
		return await Product.find();
	}

	@Query(() => [Product], { nullable: true })
	async getProducts(
		@Arg("productIds", () => [Int]) productIds: [number]
	): Promise<Product[]> {
		return await Product.findByIds(productIds);
	}
}
