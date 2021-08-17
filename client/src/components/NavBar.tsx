import { Box, Button, Flex, Icon, Image, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { threadId } from "worker_threads";
import theme from "../theme";
import { MenuItem } from "./menuItem";

interface NavBarProps {}

export const NavBar: React.FC<{ NavBarProps }> = ({}) => {
	const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
	const [{ data, fetching }] = useMeQuery({
		pause: isServer()
	});
	let body = null;

	if (fetching) {
		//loading
	} else if (!data?.me) {
		//user not logged in
		body = (
			<Flex flexDirection={"column"}>
				<MenuItem name={"Login"} link={"/login"} mb={4} />
				<MenuItem name={"Register"} link={"/register"} />
			</Flex>
		);
	} else {
		//user logged in
		body = (
			<Flex flexDirection={"column"} padding={3}>
				<Box
					background={"#121111e3"}
					borderRadius={"full"}
					textAlign={"center"}
					mb={3}
					fontWeight={"bold"}
					color={"white"}
				>
					{data.me.username}
				</Box>
				<Box
					background={"#121111e3"}
					borderRadius={"full"}
					textAlign={"center"}
				>
					<Button
						onClick={() => {
							logout();
						}}
						color={"white"}
						isLoading={logoutFetching}
						variant="link"
						textAlign={"center"}
					>
						logout
					</Button>
				</Box>
			</Flex>
		);
	}
	return (
		<Flex
			position="fixed"
			zIndex={1}
			top={0}
			bg="#8a9e70"
			bottom={0}
			p={4}
			flexDirection={"column"}
		>
			<NextLink href="/">
				<Image
					src={"/images/Globe Logo.png"}
					boxSize={"120px"}
					alt={"Hello World"}
					mb={3}
				/>
			</NextLink>
			<Box>{body}</Box>
		</Flex>
	);
};
