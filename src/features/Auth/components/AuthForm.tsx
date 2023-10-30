import { Stack, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { InfoModal, LoadingSpinner } from '@/shared/ui/Page';
import { useAuthSelector } from '@/common/hooks/auth-hook';
import { InputForm } from '@/shared/ui/Input';

import { AuthFormInputs, AuthFormProps } from '../auth.types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRouter } from '@/AppRouter';

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
  const { clearError, isLoading, login, singUp, isLoggedIn, error } = useAuthSelector();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: yupResolver(LoginSchema),
  });
  const nav = useNavigate();

  function onSubmit(values: AuthFormInputs) {
    if (isLogin) login(values.password, values.email);
    else singUp(values.password, values.email);
  }

  useEffect(() => {
    if (isLoggedIn) {
      nav(AppRouter.home);
    }
  }, [isLoggedIn]);

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
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align='flex-start'>
          <InputForm
            register={register('email')}
            defaultValue=''
            autoComplete='off'
            placeholder='E-mail'
            type='email'
            errors={errors}
          />
          <InputForm
            register={register('password')}
            defaultValue=''
            placeholder='Password'
            autoComplete='new-password'
            onChange={(e) => {
              const { onChange: changeHandler } = register('password');
              if (isLogin) {
                changeHandler(e).then(() => setValue('passwordRepeat', e.target.value));
              } else {
                changeHandler(e).then();
              }
            }}
            type='password'
            errors={errors}
          />
          {!isLogin && (
            <InputForm
              register={register('passwordRepeat')}
              defaultValue=''
              placeholder='Password repeat.'
              autoComplete='new-password'
              type='password'
              errors={errors}
            />
          )}
          <Stack spacing={10} width='100%' pt='10px'>
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
