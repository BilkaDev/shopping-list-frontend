import { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useHttpClient } from '../../hooks/http-hook';
import { LoadingSpinner } from '../UiElements/LoadingSpinner';
import { InfoModal } from '../UiElements/InfoModal';
import { ChangePasswordResponse } from 'interfaces';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password is too short! minimum length is 6 characters!')
    .max(255, 'Password is too long! Maximum length is 255 characters!')
    .required('Required!'),
  newPassword: Yup.string()
    .min(6, 'Password is too short! minimum length is 6 characters!')
    .max(255, 'Password is too long! Maximum length is 255 characters!')
    .required('Required!'),
  newPasswordRepeat: Yup.string()
    .min(6, 'Password is too short! minimum length is 6 characters!')
    .max(255, 'Password is too long! Maximum length is 255 characters!')
    .required('Required!')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match.'),
});

interface EditPasswordFormInputs {
  password: string;
  newPassword: string;
  newPasswordRepeat: string;
}

export const EditPasswordForm = () => {
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPasswordFormInputs>({
    resolver: yupResolver(ChangePasswordSchema),
  });

  async function onSubmit(values: EditPasswordFormInputs) {
    const data = await sendRequest<ChangePasswordResponse>(
      '/user/edit',
      'POST',
      {
        newPwd: values.newPasswordRepeat,
        pwd: values.password,
      }
    );
    if (data) {
      setToastMessage({
        status: 'success',
        title: 'Success!',
        body: 'The password has been changed.',
      });
    }
  }

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

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && (
        <InfoModal
          isError
          message={error}
          onClose={clearError}
          title={'Failed!'}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="flex-start">
          <FormControl isInvalid={!!errors.password}>
            <Input
              {...register('password')}
              type="password"
              placeholder="Password"
              variant="filled"
              bgColor="#292A2B"
              color="#DADADA"
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.newPassword}>
            <Input
              {...register('newPassword')}
              type="password"
              placeholder="New password"
              variant="filled"
              bgColor="#292A2B"
              color="#DADADA"
            />
            <FormErrorMessage>
              {errors.newPassword && errors.newPassword.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.newPasswordRepeat}>
            <Input
              {...register('newPasswordRepeat')}
              type="password"
              placeholder="Repeat new password"
              variant="filled"
              bgColor="#292A2B"
              color="#DADADA"
            />
            <FormErrorMessage>
              {errors.newPasswordRepeat && errors.newPasswordRepeat.message}
            </FormErrorMessage>
          </FormControl>
          <Stack spacing={10} width="100%" pt="10px">
            <Stack direction={{ base: 'column', sm: 'row' }} align={'center'}>
              <Button type="submit" colorScheme="blue">
                Change password
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </form>
    </>
  );
};
