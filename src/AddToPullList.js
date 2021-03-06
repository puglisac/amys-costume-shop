import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { addItemToPullList } from './actions/users';

const AddToPullList = memo(({ itemId, email, setNotAvailable, setText }) => {
    // a button to add an item to a user's pull-list
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);
    const handleClick = () => {
        dispatch(addItemToPullList(token, email, itemId));
        setNotAvailable(true);
        setText("Item Added");
    };
    return (<Button onClick={handleClick} className="btn-sm btn-secondary">Pull Item</Button>);
});

export default AddToPullList;