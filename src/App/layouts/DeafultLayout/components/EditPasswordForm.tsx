import { useEffect, useState } from 'react';
import { Button, Stack, useToast, VStack } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { ChangePasswordResponse } from '@/types';
import { InputForm } from '@/App/shared/ui/Input';
import { InfoModal, LoadingSpinner } from '@/App/shared/ui/Page';
import { useHttpClient } from '@/App/shared/utils/http-hook';

import { EditPasswordFormInputs } from './Header.types';

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
      },
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
          message={error}
          onClose={clearError}
          title={'Failed!'}
          isError
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align='flex-start'>
          <InputForm
            register={register('password')}
            type='password'
            placeholder='Password'
            errors={errors}
          />
          <InputForm
            register={register('newPassword')}
            type='password'
            placeholder='New password'
            errors={errors}
          />
          <InputForm
            register={register('newPasswordRepeat')}
            type='password'
            placeholder='Repeat new password'
            errors={errors}
          />
          <Stack spacing={10} width='100%' pt='10px'>
            <Stack direction={{ base: 'column', sm: 'row' }} align={'center'}>
              <Button type='submit' colorScheme='blue'>
                Change password
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </form>
    </>
  );
};
