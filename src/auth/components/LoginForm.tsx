import { useFormik } from 'formik';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useHttpClient } from '../../common/hooks/http-hook';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import * as Yup from 'yup';
import { Link as ReachLink } from 'react-router-dom';
import { InfoModal } from '../../common/components/UiElements/InfoModal';
import { useAuth } from '../../common/hooks/auth-hook';
import { AuthLogin } from 'interfaces';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password is too short!')
    .max(255, 'Password is too long!')
    .required('Required!'),
  email: Yup.string()
    .email('Enter a valid e-mail address!')
    .required('Required!'),
});

export const LoginForm = () => {
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async values => {
      const data = await sendRequest<AuthLogin>('/auth/login', 'POST', {
        email: values.email,
        pwd: values.password,
      });
      if (data) {
        auth.login(data.user.userId, data.user.email);
      }
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl isInvalid={!!formik.errors.email}>
            <Input
              id="email"
              name="email"
              type="email"
              variant="filled"
              placeholder="E-mail"
              onChange={formik.handleChange}
              value={formik.values.email}
              bgColor="#292A2B"
              color="#DADADA"
            />
            {!!formik.errors.email && (
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formik.errors.password}>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              variant="filled"
              bgColor="#292A2B"
              color="#DADADA"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {!!formik.errors.password && (
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            )}
          </FormControl>
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
