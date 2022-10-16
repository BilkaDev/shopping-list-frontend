import React, { ChangeEvent } from "react";

import { Select as SelectChakra } from "@chakra-ui/react";

interface Props {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    value: number | string;
    children: React.ReactNode;
}

export function Select({ onChange, value, children }: Props) {
    return (
        <SelectChakra color="var(--dark)"
                      bgColor="var(--white)"
                      onChange={onChange}
                      value={value}>
            {children}
        </SelectChakra>
    );
}

