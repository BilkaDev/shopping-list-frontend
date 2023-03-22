import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ModalChakraProps, PORTAL_IDS } from '../UiElements.types';
import { useMemo } from 'react';
import { Portal } from './Portal';

export function ModalChakra({
  children,
  isOpen,
  onClose,
  title,
}: ModalChakraProps) {
  const content = useMemo(
    () => (
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="var(--light-dark)" color="var(--white)">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Exit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    ),
    [children, isOpen, onClose, title]
  );

  return <Portal portalId={PORTAL_IDS.modalHook}>{content}</Portal>;
}
