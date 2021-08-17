import { Flex } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperVariant } from "./wrapper";

interface LayoutProps {
	variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
	return (
		<Flex flexDirection={"row"}>
			<NavBar />
			<Wrapper variant={variant}>{children}</Wrapper>
		</Flex>
	);
};
