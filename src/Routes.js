import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import ItemsList from "./ItemsList";
import LoginForm from './LoginForm';
import CategoriesList from './CategoriesList';
import UserCard from "./UserCard";

function Routes() {

    const { currUser } = useSelector((st) => st.currUser);
    const { items } = useSelector((st) => st.items);

    return (
        <div >
            <Switch>

                <Route exact path="/">
                    {currUser ? <Redirect to="/dashboard" /> : <LoginForm />}
                </Route>

                <Route exact path="/dashboard">
                    {currUser ? <UserCard /> : <LoginForm />}
                </Route>

                <Route exact path="/pull-list">
                    {currUser ? <ItemsList items={currUser.pull_list} /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/items">
                    {currUser ? <ItemsList items={items} /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/categories">
                    {currUser ? <CategoriesList /> : <Redirect to="/" />}
                </Route>

            </Switch>
        </div>
    );
}

export default Routes;