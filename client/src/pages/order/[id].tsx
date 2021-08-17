import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/layout";
import { BoxSizes, useGetOrderQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createURQLclient";
import NextLink from "next/link";

const ShowOrder: NextPage = () => {
	const router = useRouter();
	const pageId = parseInt(router.query.id);
	const [{ data, fetching }] = useGetOrderQuery({
		variables: { id: pageId }
	});
	const customer = data?.getOrder.customer;
	const products = data?.getOrder.products;
	const createdOn = new Date(data?.getOrder.createdOn);
	const updatedOn = new Date(data?.getOrder.updatedOn);

	return (
		<Layout>
			<Flex flexDirection="row">
				<Box flexDirection="column">
					<NextLink href={`/customer/${customer?.id}`}>
						<Heading>{customer?.name}</Heading>
					</NextLink>
					<Text fontSize={"sm"}>
						{customer?.email} | {customer?.phoneNumber}
						<br />
					</Text>
					<Text fontWeight={"bold"}>
						{customer?.address} {customer?.city} {customer?.zipcode}
					</Text>
				</Box>
				<Box
					flexDirection="column"
					ml={"auto"}
					flexGrow={2}
					flexBasis={"auto"}
				>
					<Text fontWeight={"bold"} fontSize={"xl"} textAlign="end">
						STATUS:{" "}
						<span style={{ color: "#35592c" }}>
							{data?.getOrder.status}
						</span>
					</Text>
					<Text textAlign="end" fontSize={"sm"}>
						Created On: {createdOn.toLocaleString()}
						<br />
						Updated On: {updatedOn.toLocaleString()}
					</Text>
				</Box>
			</Flex>
			<Stack mt={3}>
				{products?.map((item) => {
					return (
						<Box mt={2} p={5} shadow="md" borderWidth="1px">
							<Flex flexDirection="row">
								<Box>
									<Text fontSize={"md"} fontWeight="bold">
										{item.product.name}
									</Text>
									<Text>
										{BoxSizes[item.product.boxSize]}
									</Text>
								</Box>
								<Text ml={"auto"}>
									Quantity: {item.completed}/{item.quantity}
								</Text>
							</Flex>
						</Box>
					);
				})}
			</Stack>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ShowOrder);
