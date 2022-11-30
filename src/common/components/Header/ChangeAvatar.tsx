import { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useHttpClient } from '../../hooks/http-hook';
import { LoadingSpinner } from '../UiElements/LoadingSpinner';
import { InfoModal } from '../UiElements/InfoModal';
import { ImageUpload } from '../FormElements/ImageUpload';
import { useDispatch } from 'react-redux';
import { changeAvatar } from '../../Redux/actions/auth';
import defaultIcon from '../../../assets/default-icon-profil.jpg';
import { useAuth } from '../../hooks/auth-hook';
import { AddAvatarResponse } from 'interfaces';
import { ChangeAvatarProps } from './Header.types';

export const ChangeAvatar = ({ onClose }: ChangeAvatarProps) => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient({
    all: 'Something went wrong when changing avatar. Please try again later.',
  });
  const [image, setImage] = useState<File>();
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const { avatarImg } = useAuth();

  const [toastMessage, setToastMessage] = useState<{
    title: string;
    body: string;
    status: 'error' | 'success' | 'info' | 'warning' | 'loading' | undefined;
  }>({
    title: '',
    body: '',
    status: undefined,
  });
  const toast = useToast();

  useEffect(() => {
    if (toastMessage.title !== '' && toastMessage.body !== '') {
      const { title, body, status } = toastMessage;

      toast({
        title,
        description: body,
        status: status,
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toastMessage, toast]);

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('photo', image);
      const data = await sendRequest<AddAvatarResponse>(
        '/user/avatar',
        'POST',
        formData,
        {}
      );
      if (data) {
        dispatch(changeAvatar());
        setToastMessage({
          status: 'success',
          title: 'Success!',
          body: 'The avatar has been changed.',
        });
        onClose();
      }
    }
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && (
        <InfoModal
          message={error}
          onClose={clearError}
          title={'Failed!'}
          isError
        />
      )}
      <form onSubmit={submitHandler}>
        <VStack spacing={4} align="flex-start">
          <FormControl isInvalid={!isValid}>
            <ImageUpload
              setImage={setImage}
              setIsValid={setIsValid}
              defaultImage={defaultIcon}
              image={avatarImg}
            />
            <FormErrorMessage>
              Please add image format png/jpg/jpeg and max size 512kb
            </FormErrorMessage>
          </FormControl>
          <Stack spacing={10} width="100%" pt="10px">
            <Stack direction={{ base: 'column', sm: 'row' }} align={'center'}>
              <Button disabled={!image} type="submit" colorScheme="blue">
                Change Avatar
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </form>
    </>
  );
};
