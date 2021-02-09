
import React, { useState } from 'react';
import { InputGroup, InputGroupAddon, Button, Input, Form } from 'reactstrap';

const LoginForm = (props) => {
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

    return (
        <div className="container mt-4 col-md-4">
            <Form>
                <InputGroup>
                    <Input placeholder="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange} />
                </InputGroup>
                <br />
                <InputGroup>
                    <Input placeholder="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange} />
                    <InputGroupAddon addonType="append">
                        <Button color="primary"> Login </Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        </div>
    );
};

export default LoginForm;