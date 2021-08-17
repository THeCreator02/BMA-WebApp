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
import { BoxSizes } from "../enums/boxSizes";
import { BoxTypes } from "../enums/boxTypes";

@ObjectType()
class Boxes {
	@Field(() => BoxTypes)
	@Column()
	boxType!: BoxTypes;

	@Field(() => BoxSizes)
	@Column()
	boxSize!: BoxSizes;
}

@ObjectType()
@Entity()
export class Box extends BaseEntity {
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

	@Field(() => Boxes)
	@Column(() => Boxes)
	name!: Boxes;

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
