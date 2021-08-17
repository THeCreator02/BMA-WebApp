import { Status } from "../enums/status";
import { ObjectType, Field, Int } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	ManyToOne,
	Generated,
	OneToMany
} from "typeorm";
import { Customer } from "./customer";
import { User } from "./user";
import { Production } from "./production";

@ObjectType()
@Entity()
export class Order extends BaseEntity {
	//Unique Attributes
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	@Generated("uuid")
	orderNumber: string;

	@Field(() => Int)
	@Column({ nullable: true })
	total: number;

	//Attributes
	@Field(() => Status)
	@Column({ default: Status.PENDING })
	status!: Status;

	//Relational Attributes
	@Field(() => Int)
	@Column()
	customerId: number | undefined;

	@Field(() => Customer)
	@ManyToOne(() => Customer, (customer) => customer.orders)
	customer: Customer;

	@OneToMany(() => Customer, (customer) => customer.orders)
	customers: Customer;

	@Field(() => Int)
	@Column()
	userId: number | undefined;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.orders)
	user: User;

	@Field(() => [Int], { nullable: true })
	@Column("int", { array: true })
	productIds: (number | undefined)[];

	@Field(() => [Production])
	@ManyToOne(() => Production, (production) => production.orders)
	products: (Production | undefined)[];

	//Temporal Attributes
	@Field()
	@CreateDateColumn()
	createdOn: Date;

	@Field()
	@UpdateDateColumn()
	updatedOn: Date;
}
