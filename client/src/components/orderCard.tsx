import { Box, Heading, Text, Flex, Button, Link } from "@chakra-ui/react";
import React from "react";
import { Order, Product, useGetProductsQuery } from "../generated/graphql";
import NextLink from "next/link";

interface OrderCardProps {
	p: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ p }) => {
	var prod: string = "";
	const products = p.products.map((p) => {
		if (prod.length < 90) {
			return prod + p.product.name;
		}
	});
	var date1 = new Date(p.createdOn);
	return (
		<Box p={5} shadow="md" borderWidth="1px">
			<Flex>
				<Heading fontSize="xl">{p?.customer.name}</Heading>
				<Text flexGrow={3} textAlign={"end"} color={"#35592c"}>
					{p.status}
				</Text>
			</Flex>
			<Text color={"gray"}>Ordered On: {date1.toLocaleString()}</Text>
			<Flex>
				<Text>{products + ". . ."}</Text>
				<NextLink href={`/order/${p.id}`}>
					<Link ml={"auto"}>
						View More
						{/* <Button ml={"auto"}>^</Button> */}
					</Link>
				</NextLink>
			</Flex>
		</Box>
	);
};
