import { useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { InfoModal } from '../../common/components/UiElements/InfoModal';
import { useHttpClient } from '../../common/hooks/http-hook';
import { useNavigate } from 'react-router-dom';
import { RecoverPasswordResponse } from 'interfaces';

const RecoverSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid e-mail address!')
    .required('Required!'),
});

interface RecoverFormInputs {
  email: string;
}

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
          <FormControl isInvalid={!!errors.email}>
            <Input
              {...register('email')}
              type="email"
              variant="filled"
              placeholder="E-mail"
              bgColor="#292A2B"
              color="#DADADA"
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
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
