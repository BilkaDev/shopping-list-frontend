import React, { ChangeEvent } from 'react';

import { Select as SelectChakra } from '@chakra-ui/react';

interface Props {
  value: number | string;
  setValue: (v: string) => void;
  children: React.ReactNode;
}

export function Select({ value, setValue, children }: Props) {
  function changeHandler(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
  }

  return (
    <SelectChakra
      color="var(--dark)"
      bgColor="var(--white)"
      onChange={changeHandler}
      value={value}
    >
      {children}
    </SelectChakra>
  );
}
