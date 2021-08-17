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
import { Oils } from "../enums/oils";

@ObjectType()
@Entity()
export class Oil extends BaseEntity {
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

	@Field(() => Oils)
	@Column()
	name!: Oils;

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

	@Field()
	@Column()
	expirationDate!: Date;

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
