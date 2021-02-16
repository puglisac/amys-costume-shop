
import React, { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, InputGroupAddon, Button, Input, Form } from 'reactstrap';
import { loginUser } from './actions/users';

const LoginForm = memo((props) => {
    // a form for logging in a user
    const dispatch = useDispatch();

    const initialState = {
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = formData;
        dispatch(loginUser(email, password)).catch(e => alert(e));
    }

    return (
        <div className="container mt-4 col-md-4">
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Input placeholder="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange} />
                </InputGroup>
                <br />
                <InputGroup>
                    <Input type="password"
                        placeholder="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange} />
                    <InputGroupAddon addonType="append">
                        <Button color="primary"> Login </Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
            <a href="mailto:alan.puglisi@mtsu.edu?subject=Request%20for%20access&body=I%20am%20requesting%20access%20to%20Amy's%20Costume%20Shop">Request login</a>
        </div>
    );
});

export default LoginForm;