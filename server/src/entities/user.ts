import { Post } from "./post";
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
import { Order } from "./order";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ unique: true })
	username!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@OneToMany(() => Post, (post) => post.user)
	posts: Post[];

	@OneToMany(() => Order, (order) => order.user)
	orders: Order[];

	@Column()
	password!: string;

	@Field(() => String)
	@CreateDateColumn()
	createdOn: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedOn: Date;
}
