import {
	Resolver,
	Query,
	Mutation,
	Int,
	InputType,
	Arg,
	Field,
	FieldResolver,
	Root
} from "type-graphql";
import "reflect-metadata";
// import { getConnection } from "typeorm";
import { Order } from "../entities/order";
import { getConnection } from "typeorm";
import { Customer } from "../entities/customer";
import { User } from "../entities/user";
import { Production } from "../entities/production";

@InputType()
class OrderInput {
	@Field(() => Int)
	customerId: number;

	@Field(() => Int)
	userId: number;

	@Field(() => [Int])
	productIds: number[];
}

// @ObjectType()
// class PaginatedOrders {
// 	@Field(() => [Order])
// 	orders: Order[];
// 	@Field(() => Boolean)
// 	hasMore: boolean;
// }
@Resolver(Order)
export class OrderResolver {
	@FieldResolver(() => Customer)
	customer(@Root() order: Order) {
		return Customer.findOne(order.customerId);
	}
	@FieldResolver(() => User)
	user(@Root() order: Order) {
		return User.findOne(order.userId);
	}

	@FieldResolver(() => [Production])
	async products(@Root() order: Order) {
		return await Production.findByIds(order.productIds);
	}

	@Query(() => [Order])
	async orders(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null
	): Promise<Order[]> {
		const realLimit = Math.min(50, limit);
		const reaLimitPlusOne = realLimit + 1;
		const replacememnts: any = [reaLimitPlusOne];

		if (cursor) {
			replacememnts.push(new Date(parseInt(cursor)));
		}
		const orders = await getConnection().query(
			`
		select o.*
		from "order" o
		${cursor ? `where o."createdOn" < $2` : ""}
		order by o."createdOn" DESC
		limit $1
		`,
			replacememnts
		);
		return orders.slice(0, realLimit);
		// hasMore: orders.length === reaLimitPlusOne
	}

	@Query(() => Order)
	async getOrder(
		@Arg("id", () => Int) id: number
	): Promise<Order | undefined> {
		return Order.findOne(id);
	}

	@Mutation(() => Order)
	async createOrder(
		@Arg("orderInput") orderInput: OrderInput
	): Promise<Order> {
		return await Order.create({ ...orderInput }).save();
	}

	@Mutation(() => Boolean)
	async deleteOrder(@Arg("id", () => Int) orderId: number): Promise<Boolean> {
		await Order.delete({ id: orderId });
		return true;
	}
}
