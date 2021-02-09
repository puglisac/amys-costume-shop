
import React from 'react';
import { InputGroup, InputGroupAddon, Button, Input, Form } from 'reactstrap';

const LoginForm = (props) => {
    return (
        <div className="container mt-4 col-md-4">
            <Form>
                <InputGroup>
                    <Input placeholder="email" />
                </InputGroup>
                <br />
                <InputGroup>
                    <Input placeholder="password" />
                    <InputGroupAddon addonType="append">
                        <Button color="primary"> Login </Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        </div>
    );
};

export default LoginForm;