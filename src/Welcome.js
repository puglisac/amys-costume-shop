import React from 'react';
import { Jumbotron } from 'reactstrap';

const Welcome = (props) => {
    // welcome page displayed after logging in
    return (
        <div className="container mt-4">
            <Jumbotron>
                <h1 className="display-3">Welcome to Amy's Costume Shop!</h1>
                <p className="lead">Filter through all of the <a href="/items">items</a> or browse by <a href="/categories">category</a>.</p>

            </Jumbotron>
        </div>
    );
};

export default Welcome;
