import React from "react";
import {Box, Center, Spinner} from "@chakra-ui/react";


export const LoadingSpinner = () => {
    return (
        <Box position="absolute" left="0" top="0" w="100vw" h="100vh" zIndex="100" bgColor="rgba(0, 0, 0, 0.6)">
            <Center style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)"
            }}>
                <Spinner
                    mt="20px"
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="red.500"
                    size="xl"
                />
            </Center>
        </Box>
    );
};
