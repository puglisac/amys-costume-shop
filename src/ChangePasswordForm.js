
import React, { useState, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, editCategory, removeCategory } from './actions/categories';
import { ModalFooter, Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { changePassword } from "./actions/users";
import AreYouSure from './AreYouSure';
import { useHistory } from 'react-router-dom';

const ChangePasswordForm = memo(({ toggle, user }) => {
    // form to add/edit categories
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);

    const initialState = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    };

    // handles input fields
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }));
    };

    // adds a category or edits a category, then toggles the modal close
    const handleSubmit = (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = formData;
        if (newPassword != confirmPassword) {
            alert("Passwords do not match");
        } else {
            dispatch(changePassword(token, user.email, oldPassword, newPassword)).catch(e => alert(e));
            toggle();
        }

    };

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="oldPassword">Current Password</Label>
                    <Input
                        type="password"
                        placeholder="Current Password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="newPassword">New Password</Label>
                    <Input
                        type="password"
                        placeholder="New Password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm</Label>
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required />
                </FormGroup>
                <ModalFooter>
                    <Button color="primary" >Submit</Button>{' '}
                </ModalFooter>
            </Form>
        </div>
    );
});

export default ChangePasswordForm;