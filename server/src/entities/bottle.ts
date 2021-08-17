import { ObjectType, Field, Int } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	Generated
} from "typeorm";
import { BottleSizes } from "../enums/bottleSizes";
import { BottleTypes } from "../enums/bottleType";

@ObjectType()
class Bottles {
	@Field(() => BottleSizes)
	@Column()
	bottleSize!: BottleSizes;

	@Field(() => BottleTypes)
	@Column()
	bottleType!: BottleTypes;
}

@ObjectType()
@Entity()
export class Bottle extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Generated("uuid")
	oilNumber!: string;

	@Field(() => Int)
	@Column()
	userId!: number;

	@Field(() => Int)
	@Column()
	lastUserId!: number;

	@Field(() => Bottles)
	@Column(() => Bottles)
	name!: Bottles;

	@Field(() => Int)
	@Column()
	total!: number;

	@Field(() => Int)
	@Column({ default: 0 })
	used!: number;

	@Field()
	@Column()
	lotNumber!: string;

	@Field()
	@Column()
	supplier!: string;

	@Field()
	@Column()
	receiveDate!: Date;

	@Field(() => Int)
	@Column({ default: null })
	additional: number;

	//NEED IN EVERY TABLE
	@Field()
	@CreateDateColumn()
	createdOn: Date;

	@Field()
	@UpdateDateColumn()
	updatedOn: Date;
}
