import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneItem } from './actions/items';
import FormModal from './FormModal';

const ItemDetails = () => {
    const dispatch = useDispatch();
    const { currUser } = useSelector(st => st.currUser);
    const { item_id } = useParams();
    const { items } = useSelector(st => st.items);
    const { token } = useSelector(st => st.token);
    useEffect(() => {
        dispatch(getOneItem(token, item_id));
    }, []);
    return (
        <div>
            {items ? items.name : "Loading..."}
            {currUser.is_admin ? <FormModal buttonLabel="Edit Item" formType="item" item={items} /> : null}
        </div>
    );
};
export default ItemDetails;