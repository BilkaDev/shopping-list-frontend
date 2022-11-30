import { useState } from 'react';
import { Button, Stack, VStack } from '@chakra-ui/react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { InfoModal } from '../../common/components/UiElements/InfoModal';
import { useHttpClient } from '../../common/hooks/http-hook';
import { useNavigate } from 'react-router-dom';
import { RecoverPasswordResponse } from 'interfaces';
import { RecoverFormInputs } from '../auth.types';
import { InputForm } from '../../common/components/UiElements/InputForm';

const RecoverSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid e-mail address!')
    .required('Required!'),
});

export function RecoverForm() {
  const { sendRequest, error, clearError, isLoading } = useHttpClient({
    all: 'Something went wrong when recover password. Please try again later!',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverFormInputs>({
    resolver: yupResolver(RecoverSchema),
  });

  async function onSubmit(values: RecoverFormInputs) {
    const data = await sendRequest<RecoverPasswordResponse>(
      '/user/recover',
      'POST',
      {
        email: values.email,
      }
    );
    if (data) {
      setIsSuccess(true);
    }
  }
  const closeSuccessModalHandler = () => {
    setIsSuccess(false);
    nav('/');
  };

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
      {isSuccess && (
        <InfoModal
          message={'If e-mail is used then password has been sent'}
          onClose={closeSuccessModalHandler}
          title={'Success!'}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="flex-start">
          <InputForm
            register={register('email')}
            type="email"
            placeholder="E-mail"
            errors={errors}
          />
          <Stack spacing={10} width="100%" pt="20px">
            <Stack direction={{ base: 'column', sm: 'row' }} justify={'center'}>
              <Button type="submit" colorScheme="blue">
                Recover password
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </form>
    </>
  );
}
