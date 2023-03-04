import { Stack, VStack } from '@chakra-ui/react';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { InfoModal } from '../../common/components/UiElements/modals/InfoModal';
import { useAuthSelector } from '../../common/hooks/auth-hook';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { InputForm } from '../../common/components/UiElements/InputForm';
import { AuthFormProps, AuthFormInputs } from '../auth.types';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password is too short! minimum length is 6 characters!')
    .max(255, 'Password is too long! Maximum length is 255 characters!')
    .required('Required!'),
  passwordRepeat: Yup.string()
    .min(6, 'Password is too short! minimum length is 6 characters!')
    .max(255, 'Password is too long! Maximum length is 255 characters!')
    .required('Required!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
  email: Yup.string()
    .email('Enter a valid e-mail address!')
    .required('Required!'),
});
export const AuthForm = ({ isLogin, children }: AuthFormProps) => {
  const { clearError, isLoading, login, singUp, error } = useAuthSelector();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: yupResolver(LoginSchema),
  });
  if (isLogin) setValue('passwordRepeat', watch('password'));
  function onSubmit(values: AuthFormInputs) {
    if (isLogin) login(values.password, values.email);
    else singUp(values.password, values.email);
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
          {!isLogin && (
            <InputForm
              register={register('passwordRepeat')}
              placeholder="Password repeat."
              type="password"
              errors={errors}
            />
          )}
          <Stack spacing={10} width="100%" pt="10px">
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'center'}
              justify={'flex-end'}
            >
              {children}
            </Stack>
          </Stack>
        </VStack>
      </form>
    </>
  );
};
