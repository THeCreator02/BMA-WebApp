import {
	Resolver,
	Query,
	Arg,
	Int,
	Mutation,
	FieldResolver,
	Root
} from "type-graphql";
import "reflect-metadata";
import { getConnection } from "typeorm";
import { Customer } from "../entities/customer";
import { Order } from "../entities/order";

@Resolver(Customer)
export class CustomerResolver {
	@FieldResolver(() => Order)
	orders(@Root() customer: Customer) {
		return Order.findByIds(customer?.orderIds);
	}

	@Query(() => [Customer], { nullable: true })
	async customers(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null
	): Promise<Customer[]> {
		const realLimit = Math.min(50, limit);
		const allCustomers = getConnection()
			.getRepository(Customer)
			.createQueryBuilder("p")
			.orderBy('"createdOn"', "ASC")
			.take(realLimit);
		if (cursor) {
			allCustomers.where('"createdOn" < :cursor', {
				cursor: new Date(parseInt(cursor))
			});
		}
		return await allCustomers.getMany();
	}

	@Query(() => Customer)
	async getCustomer(
		@Arg("id", () => Int) id: number
	): Promise<Customer | undefined> {
		return Customer.findOne(id);
	}
	@Mutation(() => Customer)
	async insertOrder(
		@Arg("orderId", () => Int) orderId: number,
		@Arg("customerId", () => Int) customerId: number
	) {
		var orderIds: (number | undefined)[] = [];
		const customer = await Customer.findOne(customerId);
		if (!customer) {
			return undefined;
		}
		if (customer?.orderIds == null) {
			orderIds.push(orderId);
			return await Customer.update(
				{ id: customerId },
				{ orderIds: orderIds }
			);
		}
		if (typeof orderId !== "undefined") {
			orderIds = customer?.orderIds.concat(orderId);
			return Customer.update({ id: customerId }, { orderIds: orderIds });
		}
		return customer;
	}
}
