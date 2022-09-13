import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";

interface Props {
    setIsSuccess: (v: boolean) => void;
    text: string;
}

export function SuccessfullyBox(props: Props) {
    const { text, setIsSuccess } = props;
    return (
        <Box p={"1rem"} bgColor={"green.500"} borderRadius={"8px"} border={"2px"} borderColor={"green.600"}>
            <Text>{text}</Text>
            <Button onClick={() => setIsSuccess(false)} variant="outline" colorScheme="gray">
                Add another one!
            </Button>
        </Box>
    );
}

