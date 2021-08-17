import { stringifyVariables } from "@urql/core";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange, Exchange } from "urql";
import { pipe, tap } from "wonka";
import {
	LogoutMutation,
	MeQuery,
	MeDocument,
	LoginMutation,
	RegisterMutation
} from "./../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import Router from "next/router";

export const createUrqlClient = (ssrExchange: any) => ({
	url: "http://localhost:4000/graphql",
	fetchOptions: {
		credentials: "include" as const
	},
	exchanges: [
		dedupExchange,
		cacheExchange({
			resolvers: {
				Query: {
					orders: cursorPagination()
				}
			},
			updates: {
				mutation: {
					logout: (_result, args, cache, info) => {
						betterUpdateQuery<LogoutMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							_result,
							() => ({ me: null })
						);
					},
					login: (_result, args, cache, info) => {
						betterUpdateQuery<LoginMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							_result,
							(result, query) => {
								if (result.login.errors) {
									return query;
								} else {
									return {
										me: result.login.user
									};
								}
							}
						);
					},

					register: (_result, args, cache, info) => {
						betterUpdateQuery<RegisterMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							_result,
							(result, query) => {
								if (result.register.errors) {
									return query;
								} else {
									return { me: result.register.user };
								}
							}
						);
					}
				}
			}
		}),
		errorExchange,
		ssrExchange,
		fetchExchange
	]
});

const errorExchange: Exchange =
	({ forward }) =>
	(ops$) => {
		return pipe(
			forward(ops$),
			tap(({ error }) => {
				if (error?.message.includes("Not Authenticated")) {
					Router.replace("/login");
				}
			})
		);
	};

const cursorPagination = (): Resolver => {
	return (_parent, fieldArgs, cache, info) => {
		const { parentKey: entityKey, fieldName } = info;
		const allFields = cache.inspectFields(entityKey);
		const fieldInfos = allFields.filter(
			(info) => info.fieldName === fieldName
		);
		const size = fieldInfos.length;
		if (size === 0) {
			return undefined;
		}
		const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
		const isItInTheCache = cache.resolve(entityKey, fieldKey);
		info.partial = !isItInTheCache;
		const results: string[] = [];
		fieldInfos.forEach((fieldInfo) => {
			const data = cache.resolve(
				entityKey,
				fieldInfo.fieldKey
			) as string[];
			results.push(...data);
		});
		return results;
		// 	const visited = new Set();
		// 	let result: NullArray<string> = [];
		// 	let prevOffset: number | null = null;

		// 	for (let i = 0; i < size; i++) {
		// 		const { fieldKey, arguments: args } = fieldInfos[i];
		// 		if (args === null || !compareArgs(fieldArgs, args)) {
		// 			continue;
		// 		}

		// 		const links = cache.resolve(entityKey, fieldKey) as string[];
		// 		const currentOffset = args[cursorArg];

		// 		if (
		// 			links === null ||
		// 			links.length === 0 ||
		// 			typeof currentOffset !== "number"
		// 		) {
		// 			continue;
		// 		}

		// 		const tempResult: NullArray<string> = [];

		// 		for (let j = 0; j < links.length; j++) {
		// 			const link = links[j];
		// 			if (visited.has(link)) continue;
		// 			tempResult.push(link);
		// 			visited.add(link);
		// 		}

		// 		if (
		// 			(!prevOffset || currentOffset > prevOffset) ===
		// 			(mergeMode === "after")
		// 		) {
		// 			result = [...result, ...tempResult];
		// 		} else {
		// 			result = [...tempResult, ...result];
		// 		}

		// 		prevOffset = currentOffset;
		// 	}

		// 	const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
		// 	if (hasCurrentPage) {
		// 		return result;
		// 	} else if (!(info as any).store.schema) {
		// 		return undefined;
		// 	} else {
		// 		info.partial = true;
		// 		return result;
		// 	}
		// };
	};
};
