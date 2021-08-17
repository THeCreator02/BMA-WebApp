import { Flex, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useOrdersQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createURQLclient";
import { OrderList } from "../components/orderList";
import { useState } from "react";

const index = () => {
	const [variables, setVariables] = useState({
		limit: 10,
		cursor: null as null | string
	});
	const [{ data, fetching }] = useOrdersQuery({ variables: variables });
	if (!fetching && !data) {
		return (
			<Flex alignItems={"center"} flexDirection={"column"} mt={50}>
				<Heading>404</Heading>
				<Text fontSize={"xl"} textAlign={"center"}>
					Not Found <br />
					For some reason data failed to get in your browser
				</Text>
			</Flex>
		);
	}
	return (
		<OrderList
			data={data?.orders}
			fetching={fetching}
			setVariables={setVariables}
		/>
	);
};
export default withUrqlClient(createUrqlClient, { ssr: false })(index);
