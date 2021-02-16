import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, removeItemFromPullList } from './actions/users';
import { Table } from 'reactstrap';
import PulledRow from './PulledRow';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';


const PullList = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);
    const { email } = useParams();
    const { currUser } = useSelector(st => st.currUser);
    const { users } = useSelector(st => st.users);

    const handleClick = () => {
        dispatch(removeItemFromPullList(token, email, "all"));
    };

    useEffect(() => {
        dispatch(getUser(email, token)).catch(e => alert(e));
    }, []);

    return (
        <div className="container">
            <Table>
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
                    {!Array.isArray(users) ? users.pull_list.map(i => <PulledRow key={i.id} item={i} currUser={currUser} />) : "Loading..."}
                </tbody>
            </Table>
            {currUser.is_admin ? <Button className="btn-danger" onClick={handleClick}>Return All</Button> : null}
        </div>
    );
};



export default PullList;
