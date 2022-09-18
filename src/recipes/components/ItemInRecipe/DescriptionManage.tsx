import React, { FormEvent, useState } from "react";
import { Button, Textarea, VStack } from "@chakra-ui/react";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { InfoModal } from "../../../common/components/UiElements/InfoModal";
import { LoadingSpinner } from "../../../common/components/UiElements/LoadingSpinner";

interface Props {
    show: boolean;
    id: string;
}

export function DescriptionManage({ show, id }: Props) {
    const [description, setDescription] = useState("");
    const { isLoading, error, sendRequest, clearError, setError } = useHttpClient();


    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        const res: any = await sendRequest("/recipe/edit-description", "PATCH", { description, id }, {
            "Content-Type": "application/json",
        });

        if (!res.isSuccess) {
            return setError("Adding description to the recipe failed.");
        }
    };

    return (
        <>
            {error &&
                <InfoModal message={error} isError onClose={clearError} title={"Failed!"}/>}
            {isLoading && <LoadingSpinner/>}
            {show &&
                <form onSubmit={submitHandler}>
                    <VStack spacing={4}>
                        <Textarea placeholder="Add description"
                                  onChange={(e) => setDescription(e.target.value)}/>
                        <Button type="submit" colorScheme="gray"
                                color="var(--dark)">Add description</Button>
                    </VStack>
                </form>
            }
        </>
    );
}

