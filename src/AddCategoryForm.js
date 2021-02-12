
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from './actions/categories';
import { ModalFooter, Button, Input, Form, FormGroup, Label } from 'reactstrap';


const AddCategoryForm = ({ toggle }) => {
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);
    const initialState = {
        name: "",
        description: ""
    };
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
        dispatch(addCategory(token, formData)).catch(e => alert(e));
        toggle();
    };

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input placeholder="Category name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        type="textarea"
                        placeholder="Category description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange} />
                </FormGroup>
                <ModalFooter>
                    <Button color="primary" >Add Item</Button>{' '}
                </ModalFooter>
            </Form>
        </div>
    );
};

export default AddCategoryForm;