import { Box, Button, Text } from '@chakra-ui/react';
import { SuccessfullyBoxProps } from '../UiElements.types';

export function SuccessfullyBox({ setIsSuccess, text }: SuccessfullyBoxProps) {
  return (
    <Box
      p={'1rem'}
      bgColor={'green.500'}
      borderRadius={'8px'}
      border={'2px'}
      borderColor={'green.600'}
    >
      <Text>{text}</Text>
      <Button
        onClick={() => setIsSuccess(false)}
        variant="outline"
        colorScheme="gray"
      >
        Add another one!
      </Button>
    </Box>
  );
}
