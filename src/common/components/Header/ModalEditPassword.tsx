import React from 'react';
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {EditPasswordForm} from "./EditPasswordForm";

interface Props {
    onClose: ()=> void,
    isOpen: boolean
}

export function ModalEditPassword(props:Props) {
    const {isOpen,onClose} = props

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay/>
            <ModalContent bgColor="var(--light-dark)" color="var(--white)">
                <ModalHeader>Change password</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <EditPasswordForm/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose} >Exit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}