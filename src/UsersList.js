import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from './actions/items';
import { Table } from 'reactstrap';
import FormModal from './FormModal';
import UserRow from './UserRow';
import { getAllCategories } from './actions/categories';
import { useParams } from 'react-router-dom';
import { getAllUsers } from './actions/users';
import { paginate } from './helpers';
import PaginationButtons from './PaginationButtons';


const UsersList = () => {
    // a list of all users
    const { token } = useSelector(st => st.token);
    const { currUser } = useSelector(st => st.currUser);
    const { users } = useSelector(st => st.users);
    const dispatch = useDispatch();

    // handles pagination
    const [pageNumber, setPageNumber] = useState(1);
    const PAGESIZE = 15;
    let paginatedUsers;
    if (Array.isArray(users)) {
        paginatedUsers = paginate(users, pageNumber, PAGESIZE);
    }

    useEffect(() => {
        dispatch(getAllUsers(token)).catch(e => alert(e));
    }, []);
    return (
        <div className="container row">
            <div className="col-md-6 col-lg m-4">
                <h3>Users</h3>
                {users ? <p>Total: {users.length}</p> : null}
                <Table className="shadow p-2">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) ? paginatedUsers.map(u => <UserRow key={u.id} user={u} />) : "Loading..."}
                    </tbody>
                </Table>
                {Array.isArray(users) && users.length > PAGESIZE ? <PaginationButtons page={pageNumber} setPage={setPageNumber} size={Math.ceil(users.length / PAGESIZE)} /> : null}
                {currUser.is_admin ? <FormModal buttonLabel="Add User" formType="user" /> : null}
            </div>
        </div>
    );
};



export default UsersList;
