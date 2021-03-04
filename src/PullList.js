import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, removeItemFromPullList } from './actions/users';
import { Table } from 'reactstrap';
import PulledRow from './PulledRow';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { paginate } from './helpers';
import PaginationButtons from './PaginationButtons';
import LoadingModal from './LoadingModal';


const PullList = () => {
    // a list of items pulled by a user
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);
    const { email } = useParams();
    const { currUser } = useSelector(st => st.currUser);
    const { users } = useSelector(st => st.users);

    // handles pagination
    const [pageNumber, setPageNumber] = useState(1);
    const PAGESIZE = 15;
    let paginatedItems;
    if (users && !Array.isArray(users)) {
        paginatedItems = paginate(users.pull_list, pageNumber, PAGESIZE);
    }

    // removes an item from the user's pull_list
    const handleClick = () => {
        dispatch(removeItemFromPullList(token, email, "all"));
    };

    useEffect(() => {
        dispatch(getUser(email, token)).catch(e => alert(e));
    }, []);

    if (Array.isArray(users) || !users) {
        return <LoadingModal modal={true} />;
    } else {
        return (
            <div className="container row">
                <div className="col-md-6 col-lg m-4">
                    <h2>My Items</h2>
                    {<p>Total: {users.pull_list.length}</p>}
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
                            {paginatedItems.map(i => <PulledRow key={i.id} item={i} currUser={currUser} />)}
                        </tbody>
                    </Table>
                    {users.pull_list.length > PAGESIZE ? <PaginationButtons page={pageNumber} setPage={setPageNumber} size={Math.ceil(users.pull_list.length / PAGESIZE)} /> : null}
                    {currUser.is_admin ? <Button className="btn-danger" onClick={handleClick}>Return All</Button> : null}
                </div>
            </div>
        );
    }
};



export default PullList;
