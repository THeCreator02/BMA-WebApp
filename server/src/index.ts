import { ProductResolver } from "./resolvers/product";
import "reflect-metadata";
//Required Import for TypeORM
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
//Attaches Graphql instances to Apollo server playground
import { buildSchema } from "type-graphql";
//Allows for SQL resolvers to generate into Graphql function calls
import express from "express";
import session from "express-session";
//Express for connecting to various services
//Session for express to declare user session
import Redis from "ioredis";
import connectRedis from "connect-redis";
//In Random Access Memory database
import cors from "cors";
//Some thing to do with cookies
import { createConnection } from "typeorm";
//TypeORM connection to SQL database
import path from "path";
//User defined imports
import { __prod__, COOKIE_NAME } from "./constants";
import { User } from "./entities/user";
import { Post } from "./entities/post";
import { Product } from "./entities/product";
import { Customer } from "./entities/customer";
import { Order } from "./entities/order";
import { Production } from "./entities/production";

import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/post";
import { OrderResolver } from "./resolvers/order";
import { CustomerResolver } from "./resolvers/customer";
import { ProductionResolver } from "./resolvers/production";

import { OrderSubscriber } from "./subscriber/OrderSubscriber";
import { Oil } from "./entities/oil";
import { Bottle } from "./entities/bottle";
import { Box } from "./entities/box";
import { Flavor } from "./entities/flavor";

const main = async () => {
	await createConnection({
		type: "postgres",
		database: "BMA",
		port: 5432,
		username: "postgres",
		logging: true,
		synchronize: true,
		subscribers: [OrderSubscriber],
		migrations: [path.join(__dirname + "./migrations/*")],
		entities: [
			Post,
			User,
			Product,
			Customer,
			Order,
			Production,
			Oil,
			Bottle,
			Box,
			Flavor
		]
	});
	// add();
	// insert("products.json");
	//initialize express connection
	const app = express();
	//Initialize a new redis connection
	const RedisStore = connectRedis(session);
	//
	const redis = new Redis();
	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true
		})
	);

	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				client: redis,
				disableTouch: true
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24, //8 hours
				httpOnly: true,
				sameSite: "lax",
				secure: __prod__ //Only use https in production
			},
			saveUninitialized: false,
			secret: "yadibestGirlOnlyoneforMe",
			resave: false
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				HelloResolver,
				PostResolver,
				UserResolver,
				OrderResolver,
				CustomerResolver,
				ProductResolver,
				ProductionResolver
			],
			validate: false
		}),
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
		context: ({ req, res }) => ({ req, res, redis })
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({
		app,
		cors: false
	});

	app.listen(4000, () => {
		console.log("Started listeing on localhost:4000");
	});
};

main().catch((err) => {
	console.error(err);
});
