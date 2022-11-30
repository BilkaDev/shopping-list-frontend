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
import ReactDOM from 'react-dom';
import { ModalChakraProps } from './UiElements.types';
import { useMemo } from 'react';

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

  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook') as HTMLElement
  );
}
