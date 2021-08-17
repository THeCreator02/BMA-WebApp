import { Box, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface MenuItemProps {
	name: string;
	link?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ name, link, ...props }) => {
	{
		link ? (link = link) : (link = "/");
	}
	return (
		<Box
			{...props}
			background={"#121111e3"}
			borderRadius={"full"}
			textAlign={"center"}
		>
			<NextLink href={link}>
				<Link color="white" margin={3}>
					{name}
				</Link>
			</NextLink>
		</Box>
	);
};
