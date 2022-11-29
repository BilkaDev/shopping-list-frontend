import { ReactNode } from 'react';
import { Box, Center, VStack } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

export function Section({ children }: Props) {
  return (
    <Box>
      <Center>
        <VStack flex={1} align={'center'} maxWidth="1430px">
          {children}
        </VStack>
      </Center>
    </Box>
  );
}
