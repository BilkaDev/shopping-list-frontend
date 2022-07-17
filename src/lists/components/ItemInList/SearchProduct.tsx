import {GetProductResponse} from 'interfaces';
import React, { useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../common/Redux/store";
import {SelectProductCategory} from "../../../common/components/FormElements/SelectProductCategory";


interface Props {
    name: string;
    product: GetProductResponse | undefined;
    setProduct: (product: GetProductResponse | undefined) => void;
    onInputHandler: (id: string, value: string, isValid: boolean) => void;
    onSelectHandler: (id: string, value: number, isValid: boolean) => void;

}

export const SearchProduct = ({name, onInputHandler,onSelectHandler,product,setProduct}: Props) => {
    const [sugestions, setSugestions] = useState<GetProductResponse[]>([]);
    const {listProducts} = useSelector((store: RootState) => store.products);

    useEffect(() => {
        if (name.length > 1) {
            const regex = new RegExp(`${name}`, "gi");
            const sugestions = listProducts.filter(product => {
                setProduct(undefined);

                return product.name.match(regex);
            });
            if (sugestions[0]?.name.toLowerCase() === name.toLowerCase()) {
                setProduct(sugestions[0])
            }
            setSugestions(sugestions);
        }
    }, [name]);

    const setProductHandler = (product: GetProductResponse) => {
        setProduct(product)
    };


    return (
        <>
            <div className="SearchProduct">
                {sugestions.length > 0 && sugestions.map((sugest, id) => (
                    <div style={sugest.id=== product?.id ? {backgroundColor:'cadetblue'} : {}} key={id} onClick={()=>setProductHandler(sugest)}>
                        {sugest.name}
                    </div>))}
            </div>
            {name.length >1
                && !product
                && <SelectProductCategory onInput={onSelectHandler} initialValue={0}/>}
        </>
    )
}