import { useSelector } from "react-redux";
import { RootState } from "../../../common/Redux/store";
import React, { useMemo } from "react";
import { EditItemForm } from "../../../common/components/UiElements/EditItemForm";


interface Props {
    itemId: string;
}

export const EditItemInList = (props: Props) => {
    const { list } = useSelector((store: RootState) => store.lists);
    const { itemId } = props;
    const item = useMemo(() => list.items.filter(i => i.id === itemId)[0], []);
    return (
        <>
            <EditItemForm
                element="itemInList"
                itemId={itemId}
                item={item}
                initialInputs={{
                    name: { isValid: true, value: item.product.name },
                    category: { isValid: true, value: item.product.category },
                    weight: { isValid: true, value: item.weight },
                    count: { isValid: true, value: item.count },
                }}
                initialValid={false}
            />
        </>
    );
};

