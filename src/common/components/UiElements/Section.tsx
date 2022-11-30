import { Box, Center, VStack } from '@chakra-ui/react';
import { SectionProps } from './UiElements.types';

export function Section({ children }: SectionProps) {
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
