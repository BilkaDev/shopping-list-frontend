import React from 'react';
import {ProductCategory} from 'interfaces'

export const SelectProductCategory = () => {
    const entries = Object.entries(ProductCategory)
    const category = []
    for (const key of entries) {
        if(typeof key[1] === 'number'){
            const option = <option key={key[1]} value="{key[1]}">{key[0]}</option>
            category.push(option)
        }
    }
    return (
        <label><p>Dział:</p>
            <select>
                {category}
            </select>
        </label>
    );
};

