import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from './actions/items';

const ItemsList = () => {
    const { items } = useSelector(st => st.items);
    const { token } = useSelector(st => st.token);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllItems(token)).catch(e => alert(e));
    }, []);

    return (
        <div>
            {items ? items.map(i => i.name) : "Loading..."}
        </div>
    );
};



export default ItemsList;
