import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
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

const EditSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password is too short!')
    .max(255, 'Password is too long!')
    .required('Required!'),
  'new-password': Yup.string()
    .min(6, 'Password is too short!')
    .max(255, 'Password is too long!')
    .required('Required!'),
  'new-password-repeat': Yup.string()
    .min(6, 'Password is too short!')
    .max(255, 'Password is too long!')
    .required('Required!')
    .oneOf([Yup.ref('new-password'), null], 'Passwords must match.'),
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
  const formik = useFormik({
    initialValues: {
      password: '',
      'new-password': '',
      'new-password-repeat': '',
    },
    validationSchema: EditSchema,
    onSubmit: async values => {
      // const data = await sendRequest('/user/edit', 'PATCH', {
      //     pwd: values.password,
      //     newPwd: values["new-password"],
      // }, {
      //     'Content-Type': 'application/json',
      // });
      // if (data.isSuccess) {
      //     setToastMessage({
      //         status: 'success',
      //         title: 'Success!',
      //         body: 'The password has been changed.',
      //     })
      // } else {
      //     setToastMessage({
      //         status: 'error',
      //         title: 'Failed!',
      //         body: 'Problem when changing password, try again.',
      //     })
      //     formik.values.password = ''
      // }
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4} align="flex-start">
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
          <FormControl isInvalid={!!formik.errors['new-password']}>
            <Input
              id="new-password"
              name="new-password"
              type="password"
              placeholder="New password"
              variant="filled"
              bgColor="#292A2B"
              color="#DADADA"
              onChange={formik.handleChange}
              value={formik.values['new-password']}
            />
            {!!formik.errors['new-password'] && (
              <FormErrorMessage>
                {formik.errors['new-password']}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formik.errors['new-password-repeat']}>
            <Input
              id="new-password-repeat"
              name="new-password-repeat"
              type="password"
              placeholder="Repeat new password"
              variant="filled"
              bgColor="#292A2B"
              color="#DADADA"
              onChange={formik.handleChange}
              value={formik.values['new-password-repeat']}
            />
            {!!formik.errors['new-password-repeat'] && (
              <FormErrorMessage>
                {formik.errors['new-password-repeat']}
              </FormErrorMessage>
            )}
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
