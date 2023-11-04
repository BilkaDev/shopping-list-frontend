import { Select as SelectChakra } from '@chakra-ui/react';
import { SelectProps } from '../UiElements.types';

export function Select({ register, children }: SelectProps) {
  return (
    <SelectChakra {...register} color="var(--dark)" bgColor="var(--white)">
      {children}
    </SelectChakra>
  );
}
