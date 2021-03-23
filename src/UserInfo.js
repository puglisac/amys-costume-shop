import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';
import { getOneCategory } from './actions/categories';
import { getUser } from './actions/users';
import FormModal from './FormModal';
import LoadingModal from './LoadingModal';

const UserInfo = () => {
    // displays user info
    const dispatch = useDispatch();
    const history = useHistory();
    const { user_email } = useParams();
    const { token } = useSelector(st => st.token);
    const { currUser } = useSelector(st => st.currUser);
    const { users } = useSelector(st => st.users);

    useEffect(() => {
        dispatch(getUser(user_email, token)).catch((e) => {
            alert(e);
            if (e == "Error: No such user") {
                history.push("/users");
            };
        });
    }, []);

    let allowed = true;
    if (user_email != currUser.email && !currUser.is_admin) {
        allowed = false;
        history.push("/");
    }

    if (Array.isArray(users) || !users) {
        return <LoadingModal modal={true} />;
    } else {
        return (
            <div className="container">
                <Jumbotron>
                    <h1 className="display-3">{`Welcome ${users.first_name} ${users.last_name}`}</h1>
                    <p className="lead">{users.email}</p>
                    <p>See my <a href={`/pull-list/${users.email}`}>pull list</a>.</p>
                    {allowed ? <FormModal user={users} formType="user" buttonLabel="Edit My Info" /> : null}
                </Jumbotron>
            </div>
        );
    }
};

export default UserInfo;