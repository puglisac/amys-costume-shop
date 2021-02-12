import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { addItemToPullList } from './actions/users';

const AddToPullList = ({ itemId, email }) => {
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);
    const handleClick = () => {
        dispatch(addItemToPullList(token, email, itemId));
    };
    return (<Button onClick={handleClick} className="btn-sm btn-secondary">Pull Item</Button>);
};

export default AddToPullList;