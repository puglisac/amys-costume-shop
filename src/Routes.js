import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from './LoginForm';

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

                </Route>

            </Switch>
        </div>
    );
}

export default Routes;