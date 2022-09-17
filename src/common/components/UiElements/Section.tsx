import React, { ReactNode } from "react";
import { Box, Center, VStack } from "@chakra-ui/react";

interface Props {
    children: ReactNode;
}

export function Section(props: Props) {
    return (
        <Box>
            <Center>
                <VStack flex={1} align={"center"} maxWidth="1430px">
                    {props.children}
                </VStack>
            </Center>
        </Box>
    );
}

