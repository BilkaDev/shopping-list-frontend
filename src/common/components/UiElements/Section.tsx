import React, { ReactNode } from "react";
import { Box, VStack } from "@chakra-ui/react";

interface Props {
    children: ReactNode;
}

export function Section(props: Props) {
    return (
        <Box>
            <VStack flex={1} align={"center"}>
                {props.children}
            </VStack>
        </Box>
    );
}

