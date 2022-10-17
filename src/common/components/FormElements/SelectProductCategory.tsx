import React, { useEffect, useState } from "react";
import { ProductCategory } from "interfaces";
import { Select } from "../UiElements/Select";

interface Props {
    onInput: (id: string, value: number, isValid: boolean) => void;
    initialValue?: number;
}

export const SelectProductCategory = (props: Props) => {
    const [selectCategory, setSelectCategory] = useState<ProductCategory>(props.initialValue || 0);
    const { onInput } = props;

    const entries = Object.entries(ProductCategory);
    const category = [];
    for (const key of entries) {
        if (typeof key[1] === "number") {
            const option = <option key={key[1]} value={key[1]}>{key[0]}</option>;
            category.push(option);
        }
    }

    useEffect(() => {
        onInput("category", selectCategory, true);
    }, [onInput, selectCategory]);

    return (
        <label>
            <p>Category:</p>
            <Select value={selectCategory} setValue={(v) => setSelectCategory(Number(v))}>
                {category}
            </Select>
        </label>
    )
        ;
};

