import { ReactNode } from 'react';
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

interface Props {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
  title: string;
}

export function ModalChakra(props: Props) {
  const { isOpen, onClose, title, children } = props;

  const content = (
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
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook') as HTMLElement
  );
}
