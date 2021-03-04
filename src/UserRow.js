import React, { memo } from 'react';


const UserRow = memo(({ user }) => {
    // a row of user info
    return (<tr>
        <th><a href={`/${user.email}`}>{user.first_name}</a></th>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
    </tr>);
});
export default UserRow;