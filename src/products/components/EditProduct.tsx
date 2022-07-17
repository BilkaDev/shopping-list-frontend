import React, {useMemo} from 'react';
import { useSelector} from "react-redux";
import {RootState} from "../../common/Redux/store";
import {EditItemForm} from "../../common/components/UiElements/EditItemForm";


interface Props {
    productId: string;
}

export const EditProduct = (props: Props) => {
    const {listProducts} = useSelector((store: RootState) => store.products);
    const {productId} = props;
    const product = useMemo(() => listProducts.filter(i => i.id === productId)[0], []);
    return (
        <>
            <EditItemForm
                element="product"
                itemId={productId}
                item={product}
                iniitialInputs={{
                    name: {value: product.name, isValid: true},
                    category: {value: product.category, isValid: true},
                }
                }
            />
        </>
    );
};

