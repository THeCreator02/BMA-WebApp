import {
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent
} from "typeorm";
import { Customer } from "../entities/customer";
import { Order } from "../entities/order";

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {
	listenTo() {
		return Order;
	}

	async afterInsert(event: InsertEvent<Order>) {
		// console.log(`After POST INSERTED: ${event.entity.customerId}`);
		const customer = await Customer.findOne(event.entity.customerId);
		var updateOrderIds = customer?.orderIds.concat(event.entity.id);
		console.log(customer);
		console.log(updateOrderIds);
		Customer.update(
			{ id: event.entity?.customerId },
			{ orderIds: updateOrderIds }
		);
	}
}
