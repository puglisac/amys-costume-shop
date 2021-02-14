import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import ItemsList from "./ItemsList";
import LoginForm from './LoginForm';
import CategoriesList from './CategoriesList';
import Welcome from "./Welcome";
import PullList from './PullList';
import ItemDetails from './ItemDetails';
import CategoryHeader from './CategoryHeader';
import UserInfo from "./UserInfo";

function Routes() {

    const { currUser } = useSelector((st) => st.currUser);

    return (
        <div >
            <Switch>

                <Route exact path="/">
                    {currUser ? <Redirect to="/dashboard" /> : <LoginForm />}
                </Route>

                <Route exact path="/dashboard">
                    {currUser ? <Welcome /> : <LoginForm />}
                </Route>

                <Route exact path="/pull-list/:email">
                    {currUser ? <PullList /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/items">
                    {currUser ? <ItemsList /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/items/:item_id">
                    {currUser ? <ItemDetails /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/categories">
                    {currUser ? <CategoriesList /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/categories/:category_id">
                    {currUser ? <div><CategoryHeader /> <ItemsList /> </div> : <Redirect to="/" />}
                </Route>

                <Route exact path="/:user_email">
                    {currUser ? <UserInfo /> : <Redirect to="/" />}
                </Route>

            </Switch>
        </div>
    );
}

export default Routes;