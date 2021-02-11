
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './actions/items';
import { ModalFooter, InputGroupAddon, Button, Input, Form, FormGroup, Label } from 'reactstrap';


const AddItemForm = ({ toggle }) => {
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);
    const initialState = {
        name: "",
        location: "",
        description: "",
        quantity: "",
        image_path: ""
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
        dispatch(addItem(token, formData));
        toggle();
    };

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input placeholder="Item name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="location">Location</Label>
                    <Input
                        placeholder=" Item location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        type="textarea"
                        placeholder="Item description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="quantity">Quantity</Label>
                    <Input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="image_path">Image</Label>
                    <Input
                        placeholder="Item image"
                        name="image_path"
                        value={formData.image_path}
                        onChange={handleChange} />
                </FormGroup>
                <ModalFooter>
                    <Button color="primary" >Add Item</Button>{' '}
                </ModalFooter>
            </Form>
        </div>
    );
};

export default AddItemForm;