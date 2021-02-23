import React, { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { GET_ITEMS } from './actions/actionTypes';
import FormModal from './FormModal';

const UserRow = memo(({ user }) => {
    // a row of user info
    return (<tr>
        <th><a href={`/${user.email}`}>{user.first_name}</a></th>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
    </tr>);
});
export default UserRow;