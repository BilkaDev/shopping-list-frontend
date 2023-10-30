import { Box, Flex } from '@chakra-ui/react';
import { RecoverForm } from './components/RecoverForm';

export const RecoverPassword = () => {
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
      <Box bg="#222224" p={20} rounded="md" border="1px" mt="20px" mb="20px">
        <RecoverForm />
      </Box>
    </Flex>
  );
};
