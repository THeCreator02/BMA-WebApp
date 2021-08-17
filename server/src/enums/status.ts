import { registerEnumType } from "type-graphql";

export enum Status {
	PENDING, //Order was recieved but is being deteremined if it can be fufilled
	RECIEVED, //Order was recieved and will soon enter production
	PRODUCTION, //Your order is being produced
	SHIPPED, //Your order is ready to be Shipped/Picked Up
	COMPLETED //Your order has arrived to its destination or been picked up
}
registerEnumType(Status, {
	name: "Status",
	description: "Status updates for orders"
});
