import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import ItemsList from "./ItemsList";
import LoginForm from './LoginForm';
import CategoriesList from './CategoriesList';

function Routes() {
    let home;
    const { currUser } = useSelector((st) => st.currUser);


    return (
        <div >
            <Switch>

                <Route exact path="/">
                    {currUser ? <Redirect to="/dashboard" /> : <LoginForm />}
                </Route>

                <Route exact path="/dashboard">
                    {currUser ? <ItemsList /> : <Redirect to="/" />}
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