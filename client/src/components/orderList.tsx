import { Button } from "@chakra-ui/button";
import { Flex, Heading, Link, Stack } from "@chakra-ui/layout";
import React, { Dispatch, SetStateAction } from "react";
import { Order } from "../generated/graphql";
import { Layout } from "./layout";
import { OrderCard } from "./orderCard";
import NextLink from "next/link";

interface OrderListProps {
	data: [Order];
	fetching?: boolean;
	setVariables: Dispatch<
		SetStateAction<{
			limit: number;
			cursor: null | string;
		}>
	>;
}

export const OrderList: React.FC<OrderListProps> = ({
	data,
	fetching,
	setVariables
}) => {
	return (
		<Layout variant="regular">
			<Flex>
				<Heading>Order List</Heading>
				<NextLink href="/create-order">
					<Link ml={"auto"}>Create Order</Link>
				</NextLink>
			</Flex>
			<br />
			{fetching && !data ? (
				<h2>loading...</h2>
			) : (
				<Stack>
					{data?.map((properties) => (
						<OrderCard key={properties.id} p={properties} />
					))}
				</Stack>
			)}
			{data ? (
				<Flex>
					<Button
						onClick={() => {
							setVariables({
								limit: 10,
								cursor: data[data.length - 1].createdOn
							});
						}}
						isLoading={fetching}
						m="auto"
						mt={8}
						mb={10}
					>
						Load More
					</Button>
				</Flex>
			) : null}
		</Layout>
	);
};
