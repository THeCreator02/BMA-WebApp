import { Heading, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Layout } from "./../../components/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import {
	BoxSizes,
	useGetCustomerQuery,
	useGetOrderQuery
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createURQLclient";
import NextLink from "next/link";

const ShowCustomer: NextPage = () => {
	const router = useRouter();
	const pageId = parseInt(router.query.id);
	const [{ data, fetching }] = useGetCustomerQuery({
		variables: { id: pageId }
	});
	const orders = data?.getCustomer.orders;
	const contact = `${data?.getCustomer.phoneNumber} | ${data?.getCustomer.email}`;
	const location = `${data?.getCustomer.address} | ${data?.getCustomer.city} ${data?.getCustomer.zipcode}`;
	var orderCard: JSX.Element[] = [];

	function getOrderCard(orderCards) {
		orderCards = orders.map((order) => {
			const date1 = new Date(order.createdOn);
			const date2 = new Date(order.updatedOn);
			return (
				<Box key={order.id} mt={3} p={5} shadow="md" borderWidth="1px">
					<NextLink href={`/../order/${order.id}`}>
						<Heading fontSize={"md"}>Order: #{order.id}</Heading>
					</NextLink>
					<Text textAlign={"end"}>
						Created On: {date1.toLocaleString()}
					</Text>
					<Text textAlign={"end"}>
						Updated On: {date2.toLocaleString()}
					</Text>
					{order.products.map((product) => {
						return (
							<Flex key={product.product.id}>
								{product.product.name}{" "}
								{BoxSizes[product.product.boxSize]}
							</Flex>
						);
					})}
				</Box>
			);
		});
		console.log(orderCards);
		return orderCards;
	}

	return (
		<Layout>
			<Flex flexDirection="column">
				<Heading margin={"auto"} alignContent={"center"}>
					{data?.getCustomer.name}
				</Heading>
				<Flex flexDirection="row">
					<Text flexGrow={2} textAlign={"start"}>
						{contact}
					</Text>
					<Text>{location}</Text>
				</Flex>
			</Flex>
			<Stack>
				{!fetching ? (
					(orderCard = getOrderCard(orderCard))
				) : (
					<Text>Loading...</Text>
				)}
			</Stack>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ShowCustomer);
