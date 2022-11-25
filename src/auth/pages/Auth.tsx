import React from 'react';
import { Box, Center, Flex, Image } from '@chakra-ui/react';
import logo from '../../assets/logo.png';
import { LoginForm } from '../components/LoginForm';

export const Auth = () => {
  return (
    <Flex
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100vh"
      align="center"
      justify="center"
      bg="#222224"
    >
      <Box bg="#222224" p={6} rounded="md" border="1px" mt="20px" mb="20px">
        <Center>
          <Image
            mb="20px"
            htmlWidth="250px"
            src={logo}
            alt="Shopping-list logo"
          />
        </Center>
        <LoginForm />
      </Box>
    </Flex>
  );
};
