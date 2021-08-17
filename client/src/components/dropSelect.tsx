import { Box, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import Select from "react-select";
import { BoxSizes } from "../generated/graphql";

interface DropSelectProps {
	itemList: any[];
	title: string;
	setMultiple?: boolean;
	data: any;
	setter: React.Dispatch<React.SetStateAction<any>>;
}

export const DropSelect: React.FC<DropSelectProps> = ({
	itemList,
	title,
	setMultiple,
	data,
	setter
}) => {
	const options: { value: number; label: string }[] = [];
	itemList.forEach(async (item) => {
		if (!item.zipcode) {
			const name = item.name + " " + BoxSizes[item.boxSize];
			await options.push({ value: item.id, label: name });
		} else {
			await options.push({ value: item.id, label: item.name });
		}
	});
	if (!setMultiple) {
		setMultiple = false;
	}
	return (
		<Box>
			<Text mt={3} fontWeight={"bold"}>
				{title}
			</Text>
			<Select
				isMulti={setMultiple}
				defaultValue={data}
				onChange={setter}
				options={options}
			/>
		</Box>
	);
};
