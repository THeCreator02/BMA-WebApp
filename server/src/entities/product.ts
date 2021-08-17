import { ObjectType, Field, Int } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import GraphQLJSON from "graphql-type-json";
import { BottleSizes } from "../enums/bottleSizes";
import { BoxSizes } from "../enums/boxSizes";
import { FormulaProperties } from "../utils/formula";
import { Production } from "./production";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	brand!: string;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	barcode: string;

	@Field()
	@Column()
	itemCode: string;

	@Field(() => BottleSizes)
	@Column({ type: "float", default: 0 })
	bottleSize!: BottleSizes;

	@Field(() => BoxSizes)
	@Column()
	boxSize!: BoxSizes;

	@Field()
	@Column({ type: "float", default: 0.0 })
	caseSize!: number;

	@Field(() => GraphQLJSON)
	@Column({ type: "jsonb" })
	formula!: FormulaProperties[];

	@Field(() => Boolean)
	@Column({ default: false })
	isFusion!: Boolean;

	@Field(() => Boolean)
	@Column({ default: false })
	isBlend!: Boolean;

	@OneToMany(() => Production, (production) => production.product)
	production: Production;
	// @OneToMany(() => Order, (order) => order.products)
	// orders: Order;

	//NEED IN EVERY TABLE
	@Field(() => String)
	@CreateDateColumn()
	createdOn: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedOn: Date;
}
