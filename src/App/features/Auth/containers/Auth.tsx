import { useState } from 'react';
import { Box, Button, Center, Flex, Image } from '@chakra-ui/react';

import { useAppDispatch } from '@/Redux/store';
import { testLoginFetch } from '@/Redux/fetch-services/auth';
import { useHttpClient } from '@/App/shared/utils/http-hook';

import logo from '../../../../assets/logo.png';
import { SingUp } from '../components/SingUp';
import { Login } from '../components/Login';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { sendRequest } = useHttpClient();
  const dispatch = useAppDispatch();

  function testAccLogin() {
    dispatch(testLoginFetch(sendRequest));
  }

  return (
    <Flex
      position='absolute'
      top='0'
      left='0'
      width='100%'
      height='100vh'
      align='center'
      justify='center'
      bg='#222224'
    >
      <Box bg='#222224' p={6} rounded='md' border='1px' mt='20px' mb='20px'>
        <Center>
          <Image
            mb='20px'
            htmlWidth='250px'
            src={logo}
            alt='Shopping-list logo'
          />
        </Center>
        {isLogin ? <Login /> : <SingUp />}
        <Center marginTop={2}>
          <Button
            marginRight={2}
            onClick={() => setIsLogin(prev => !prev)}
            colorScheme='red'
          >
            {isLogin ? 'Switch to sing up' : 'Switch to  login'}
          </Button>
          <Button colorScheme='whiteAlpha' onClick={testAccLogin}>
            Tray acc
          </Button>
        </Center>
      </Box>
    </Flex>
  );
};
