import { Button, Link, Stack, Text, VStack } from '@chakra-ui/react';
import { useHttpClient } from '../../common/hooks/http-hook';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { Link as ReachLink } from 'react-router-dom';
import { InfoModal } from '../../common/components/UiElements/InfoModal';
import { useAuth } from '../../common/hooks/auth-hook';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AuthLogin } from 'interfaces';
import { InputForm } from '../../common/components/UiElements/InputForm';
import { LoginFormInputs } from '../auth.types';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password is too short! minimum length is 6 characters!')
    .max(255, 'Password is too long! Maximum length is 255 characters!')
    .required('Required!'),
  email: Yup.string()
    .email('Enter a valid e-mail address!')
    .required('Required!'),
});

export const LoginForm = () => {
  const { sendRequest, error, clearError, isLoading } = useHttpClient({
    '400': 'Incorrect login credentials!',
  });
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(LoginSchema),
  });
  async function onSubmit(values: LoginFormInputs) {
    const data = await sendRequest<AuthLogin>('/auth/login', 'POST', {
      email: values.email,
      pwd: values.password,
    });
    if (data) {
      auth.login(data.user.userId, data.user.email);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="flex-start">
          <InputForm
            register={register('email')}
            placeholder="E-mail"
            type="email"
            errors={errors}
          />
          <InputForm
            register={register('password')}
            placeholder="Password"
            type="password"
            errors={errors}
          />
          <Stack spacing={10} width="100%" pt="10px">
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'center'}
              justify={'flex-end'}
            >
              <Text>
                {' '}
                <Link
                  as={ReachLink}
                  to="/recover-password"
                  color="var(--light-gray)"
                >
                  Forgot your password?
                </Link>
              </Text>
              <Button type="submit" colorScheme="blue">
                Login
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </form>
    </>
  );
};
