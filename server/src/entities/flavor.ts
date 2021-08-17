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
import { Flavors } from "../enums/flavors";

@ObjectType()
@Entity()
export class Flavor extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Generated("uuid")
	flavorNumber!: string;

	@Field(() => Int)
	@Column()
	userId!: number;

	@Field(() => Int)
	@Column()
	lastUserId!: number;

	@Field(() => Flavors)
	@Column()
	name!: Flavors;

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
