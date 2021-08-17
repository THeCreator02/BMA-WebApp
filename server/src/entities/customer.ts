import { ObjectType, Field, Int } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Order } from "./order";

@ObjectType()
@Entity()
export class Customer extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	address!: string;

	@Field()
	@Column({ default: "cmay@bmausa.net" })
	email!: string;

	@Field()
	@Column()
	phoneNumber: string;

	@Field()
	@Column()
	city!: string;

	@Field()
	@Column()
	zipcode!: string;

	@Field(() => [Int])
	@Column("int", { array: true })
	orderIds: (number | undefined)[];

	@Field(() => [Order])
	@ManyToOne(() => Order, (order) => order.customers)
	orders: Order[];

	//NEED IN EVERY TABLE
	@Field(() => String)
	@CreateDateColumn()
	createdOn: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedOn: Date;
}
