import { User } from "./user";
import { ObjectType, Field, Int } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	ManyToOne
} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	title!: string;

	@Field()
	@Column()
	text!: string;

	@Field()
	@Column({ type: "int", default: 0 })
	points!: number;

	@Field(() => Int)
	@Column()
	userId!: number;

	@ManyToOne(() => User, (user) => user.posts)
	user: User;

	//NEED IN EVERY TABLE
	@Field(() => String)
	@CreateDateColumn()
	createdOn: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedOn: Date;
}
