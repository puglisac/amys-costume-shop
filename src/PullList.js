import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, removeItemFromPullList } from './actions/users';
import { Table } from 'reactstrap';
import PulledRow from './PulledRow';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { paginate } from './helpers';
import PaginationButtons from './PaginationButtons';


const PullList = () => {
    // a list of items pulled by a user
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);
    const { email } = useParams();
    const { currUser } = useSelector(st => st.currUser);
    const { users } = useSelector(st => st.users);

    const [pageNumber, setPageNumber] = useState(1);
    const PAGESIZE = 15;
    let paginatedItems;
    if (!Array.isArray(users)) {
        paginatedItems = paginate(users.pull_list, pageNumber, PAGESIZE);
    }


    const handleClick = () => {
        dispatch(removeItemFromPullList(token, email, "all"));
    };

    useEffect(() => {
        dispatch(getUser(email, token)).catch(e => alert(e));
    }, []);

    return (
        <div className="container row">
            <div className="col-md-6 col-lg m-4">
                <h2>My Items</h2>
                {!Array.isArray(users) ? <p>Total: {users.pull_list.length}</p> : null}
                <Table className="shadow p-2">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Item</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!Array.isArray(users) ? paginatedItems.map(i => <PulledRow key={i.id} item={i} currUser={currUser} />) : "Loading..."}
                    </tbody>
                </Table>
                {!Array.isArray(users) && users.pull_list.length > PAGESIZE ? <PaginationButtons page={pageNumber} setPage={setPageNumber} size={Math.ceil(users.pull_list.length / PAGESIZE)} /> : null}
                {currUser.is_admin ? <Button className="btn-danger" onClick={handleClick}>Return All</Button> : null}
            </div>
        </div>
    );
};



export default PullList;
