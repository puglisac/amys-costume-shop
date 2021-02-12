import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const UserCard = (props) => {
    return (
        <div className="container mt-4">
            <Jumbotron>
                <h1 className="display-3">Welcom to Amy's Costume Shop!</h1>
                <p className="lead">Filter through all of the <a href="/items">items</a> or browse by <a href="/categories">category</a>.</p>

            </Jumbotron>
        </div>
    );
};

export default UserCard;
