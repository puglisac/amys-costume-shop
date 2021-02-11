import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from './actions/items';
import FormModal from './FormModal';


const ItemsList = () => {
    const { items } = useSelector(st => st.items);
    const { token } = useSelector(st => st.token);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllItems(token)).catch(e => alert(e));
    }, []);

    return (
        <div>
            <FormModal buttonLabel="Add Item" formType="addItem" />
            {items ? items.map(i => i.name) : "Loading..."}
        </div>
    );
};



export default ItemsList;
