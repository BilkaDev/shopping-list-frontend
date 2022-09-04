import React, { ReactNode } from "react";
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

interface Props {
    onClose: () => void,
    isOpen: boolean,
    children: ReactNode,
    title: string,
}

export function ModalChakra(props: Props) {
    const { isOpen, onClose, title, children } = props;

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent bgColor="var(--light-dark)" color="var(--white)">
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" onClick={onClose}>Exit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}