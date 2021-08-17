import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/inputField";
import { Wrapper } from "../components/wrapper";
import { createUrqlClient } from "../utils/createURQLclient";
import NextLink from "next/link";
import { useForgotPasswordMutation } from "../generated/graphql";

const forgotPassword: React.FC<{}> = ({}) => {
	const [complete, setComplete] = useState(false);
	const [, forgotPassword] = useForgotPasswordMutation();
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ email: "" }}
				onSubmit={async (values, { setErrors }) => {
					await forgotPassword(values);
					setComplete(true);
				}}
			>
				{({ isSubmitting }) =>
					complete ? (
						<Box>We sent an email if that account exist</Box>
					) : (
						<Form>
							<InputField
								name="email"
								placeholder="email"
								label="Email"
								type="email"
							/>
							<Button
								mt={5}
								type="submit"
								isLoading={isSubmitting}
								colorScheme="teal"
							>
								Send Email
							</Button>
						</Form>
					)
				}
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: false })(forgotPassword);
