import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Order } from "./order";
import { Product } from "./product";

@ObjectType()
@Entity()
export class Production extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => Int)
	@Column()
	productId!: number | undefined;

	@Field(() => Product)
	@ManyToOne(() => Product, (product) => product.production)
	product: Product;

	// Reference to Order
	@OneToMany(() => Order, (order) => order.products)
	orders: Order;

	//cases per product needed
	@Field(() => Int)
	@Column()
	quantity!: number;

	@Field()
	@Column({ default: null })
	shipDate: Date;

	//Number of cases completed
	@Field(() => Int)
	@Column({ default: 0 })
	completed: number;

	//auto-generates
	@Field()
	@CreateDateColumn()
	createdOn!: Date;

	@Field()
	@UpdateDateColumn()
	updatedOn!: Date;
}
