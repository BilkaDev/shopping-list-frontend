import { Box, Center, VStack } from '@chakra-ui/react';
import { SectionProps } from './UiElements.types';

export function Section({ children }: SectionProps) {
  return (
    <Box w={'100%'}>
      <Center>
        <VStack flex={1} align={'center'} maxWidth="1430px">
          {children}
        </VStack>
      </Center>
    </Box>
  );
}
