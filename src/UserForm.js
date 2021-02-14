
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, addUser, getCurrUser, logout } from './actions/users';
import { ModalFooter, InputGroupAddon, Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { getAllCategories } from './actions/categories';
import { useHistory } from 'react-router-dom';


const UserForm = ({ toggle, user }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);
    const { currUser } = useSelector(st => st.currUser);

    let initialState;
    if (user) {
        initialState = {

            email: user.email || "",
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            is_admin: user.is_admin
        };
    } else {
        initialState = {
            email: "",
            first_name: "",
            last_name: "",
            is_admin: false
        };
    }

    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.is_admin == "false") {
            formData.is_admin = false;
        } else {
            formData.is_admin = true;
        }

        if (user) {
            if (user.email == currUser.email && currUser.email != formData.email) {

                dispatch(editUser(token, formData, user.email)).then(() => dispatch(logout())).catch(e => {
                    alert(e.response.data.message);
                });
            }
            else {
                dispatch(editUser(token, formData, user.email)).catch(e => alert(e));
            }

        }
        else {
            dispatch(addUser(token, formData)).catch(e => alert(e));
        }
        toggle();
    };

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input placeholder="Email address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="first_name">First Name</Label>
                    <Input
                        placeholder=" First name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="last_name">Last Name</Label>
                    <Input
                        placeholder="Last name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange} />
                </FormGroup>
                {currUser.is_admin ? <FormGroup>
                    <Label for="is_admin">Admin?</Label>
                    <Input type="select" name="is_admin" id="is_admin" value={formData.is_admin} onChange={handleChange}>
                        <option value="false" >no</option>
                        <option value="true" >yes</option>
                    </Input>
                </FormGroup> : null}
                <ModalFooter>
                    <Button color="primary" >Submit</Button>{' '}
                </ModalFooter>
            </Form>
        </div>
    );
};

export default UserForm;