import { Box, Button, Text, Stack, Input, Flex } from "@chakra-ui/react";
import { Console } from "console";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DropSelect } from "../components/dropSelect";
import { InputField } from "../components/inputField";
import { Layout } from "../components/layout";
import {
	BoxSizes,
	useAllProductsQuery,
	useCreateOrderMutation,
	useCreatePostMutation,
	useCreateProductMutation,
	useCustomersQuery,
	useMeQuery
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createURQLclient";
import useIsAuth from "../utils/useIsAuth";

const CreateOrder: React.FC<{}> = ({}) => {
	//React & Next hooks
	const router = useRouter();
	//React State
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState();
	const [selectedProduction, setSelectedProdcution] = useState([]);

	//Mutations
	const [, createOrder] = useCreateOrderMutation();
	const [, createProduct] = useCreateProductMutation();
	//Queries
	const [{ data: me }] = useMeQuery();
	const [{ data: products, fetching: productsLoading }] =
		useAllProductsQuery();
	const [{ data: customers, fetching: customersLoading }] = useCustomersQuery(
		{
			variables: { limit: 50 }
		}
	);
	function setUpdate(event, value) {
		setSelectedProdcution((selectedProduction) => [
			...selectedProduction,
			`${event}-${value}`
		]);
	}
	useIsAuth();
	return (
		<Layout variant="small">
			<Formik
				initialValues={{
					me: null,
					customer: null,
					selected: []
				}}
				onSubmit={async (values) => {
					const quantity = [];
					const productId = [];
					values.me = me?.me?.id;
					values.customer = selectedCustomer.value;
					const products = [...selectedProducts];
					var selected = [...selectedProduction];
					const quant = [];
					const pId = [];
					const indexes = [];
					selected.forEach((quantityId: string) => {
						var [quan, id] = quantityId.split("-");
						quant.push(parseInt(quan));
						pId.push(parseInt(id));
					});
					products.some((product) => {
						indexes.push(pId.lastIndexOf(product.value, -1));
					});
					var tempQuantity = [];
					var tempId = [];

					indexes.forEach((i) => {
						tempQuantity.push(quant[i]);
						tempId.push(pId[i]);
					});
					const production = await createProduct({
						productIds: tempId,
						quantity: tempQuantity
					});
					production.data?.createProduct.forEach((production) => {
						values.selected.push(production.id);
					});

					const { error } = await createOrder({
						orderInput: {
							customerId: values.customer,
							userId: values.me,
							productIds: values.selected
						}
					});
					if (!error) {
						router.push("/");
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						{!customersLoading && !productsLoading ? (
							<Box>
								<DropSelect
									itemList={customers?.customers}
									title={"Select Customer"}
									data={selectedCustomer}
									setter={setSelectedCustomer}
								/>
								<DropSelect
									itemList={products?.allProducts}
									title={"Select Products"}
									setMultiple={true}
									data={selectedProducts}
									setter={setSelectedProducts}
								/>
								{selectedProducts ? (
									<Stack>
										{selectedProducts.map((item) => {
											return (
												<Flex mt={3} key={item.value}>
													<Box fontSize={"sm"}>
														{item.label}
													</Box>
													<Input
														ml={"auto"}
														width="100px"
														id={item.value}
														onBlur={(event) => {
															setUpdate(
																event.target
																	.value,
																item.value
															);
														}}
														textAlign={"end"}
														placeholder={"Quantity"}
													/>
												</Flex>
											);
										})}
									</Stack>
								) : null}
							</Box>
						) : (
							<Text>Loading</Text>
						)}
						<Button
							mt={5}
							type="submit"
							isLoading={isSubmitting}
							colorScheme="teal"
						>
							Create Order
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};
export default withUrqlClient(createUrqlClient, { ssr: false })(CreateOrder);
