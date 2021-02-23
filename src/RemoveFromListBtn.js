import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { removeItemFromPullList } from './actions/users';

const RemoveFromListBtn = ({ itemId }) => {
    // a button to remove an item from a user's pull-list
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);
    const { users } = useSelector(st => st.users);
    const handleClick = () => {
        dispatch(removeItemFromPullList(token, users.email, itemId)).catch(e => alert(e.response.data.message));
    };

    return (<Button className="btn-sm" onClick={handleClick}>Return</Button>);
};

export default RemoveFromListBtn;