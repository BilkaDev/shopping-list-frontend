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
import { useFormik } from 'formik';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { InfoModal } from '../../common/components/UiElements/InfoModal';
import { useHttpClient } from '../../common/hooks/http-hook';
import { useNavigate } from 'react-router-dom';

const RecoverSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid e-mail address!')
    .required('Required!'),
});

export function RecoverForm() {
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: RecoverSchema,
    onSubmit: async values => {
      const data = await sendRequest(
        '/user/recover',
        'POST',
        {
          email: values.email,
        },
        {
          'Content-Type': 'application/json',
        }
      );
      if (data.isSuccess) {
        setIsSuccess(true);
      }
    },
  });

  const closeSucessModalHandler = () => {
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
          onClose={closeSucessModalHandler}
          title={'Success!'}
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
