import React from 'react';
import { AuthForm } from './AuthForm';
import { Button } from '@chakra-ui/react';

export function SingUp() {
  return (
    <div>
      <AuthForm>
        <Button type="submit" colorScheme="blue">
          Sing up
        </Button>
      </AuthForm>
    </div>
  );
}
