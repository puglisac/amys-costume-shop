import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from './actions/items';
import { Table } from 'reactstrap';
import FormModal from './FormModal';
import UserRow from './UserRow';
import { getAllCategories } from './actions/categories';
import { useParams } from 'react-router-dom';
import { getAllUsers } from './actions/users';



const UsersList = () => {
    // a list of all users
    const { token } = useSelector(st => st.token);
    const { currUser } = useSelector(st => st.currUser);
    const { users } = useSelector(st => st.users);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers(token)).catch(e => alert(e));
    }, []);
    return (
        <div className="container">
            <h3>Users</h3>
            <p>Total: {users.length}</p>
            <Table className=" mt-4 shadow-sm p-2">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>

                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) ? users.map(u => <UserRow key={u.id} user={u} />) : "Loading..."}
                </tbody>
            </Table>
            {currUser.is_admin ? <FormModal buttonLabel="Add User" formType="user" /> : null}
        </div>
    );
};



export default UsersList;
