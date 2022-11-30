import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { InfoModalProps } from './UiElements.types';

export const InfoModal = ({
  title,
  message,
  onClose,
  isError,
}: InfoModalProps) => {
  const content = useMemo(
    () => (
      <Modal onClose={onClose} isOpen={true} isCentered>
        <ModalOverlay />
        <ModalContent
          borderRadius="8px"
          borderColor={isError ? 'red.200' : 'green.200'}
          p="0.5rem"
          bgColor={isError ? 'red.200' : 'green.200'}
        >
          <Alert
            status={isError ? 'error' : 'success'}
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {title}
            </AlertTitle>
            <AlertDescription maxWidth="sm">{message}</AlertDescription>
            <Button
              mt="0.5rem"
              bgColor={isError ? 'red' : 'green'}
              onClick={onClose}
              type="submit"
              colorScheme={isError ? 'red' : 'green'}
            >
              Exit
            </Button>
          </Alert>
        </ModalContent>
      </Modal>
    ),
    [isError, message, onClose, title]
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook') as HTMLElement
  );
};
