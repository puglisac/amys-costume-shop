import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import ItemsList from "./ItemsList";
import LoginForm from './LoginForm';
import CategoriesList from './CategoriesList';
import UserCard from "./UserCard";
import PullList from './PullList';

function Routes() {

    const { currUser } = useSelector((st) => st.currUser);

    return (
        <div >
            <Switch>

                <Route exact path="/">
                    {currUser ? <Redirect to="/dashboard" /> : <LoginForm />}
                </Route>

                <Route exact path="/dashboard">
                    {currUser ? <UserCard /> : <LoginForm />}
                </Route>

                <Route exact path="/pull-list/:email">
                    {currUser ? <PullList /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/items">
                    {currUser ? <ItemsList /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/categories">
                    {currUser ? <CategoriesList /> : <Redirect to="/" />}
                </Route>

            </Switch>
        </div>
    );
}

export default Routes;