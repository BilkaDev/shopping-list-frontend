import React from 'react';
import { AuthForm } from './AuthForm';
import { Button, Link, Text } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

export function Login() {
  return (
    <>
      <AuthForm isLogin={true}>
        <Text>
          <Link as={ReachLink} to="/recover-password" color="var(--light-gray)">
            Forgot your password?
          </Link>
        </Text>
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
      </AuthForm>
    </>
  );
}
