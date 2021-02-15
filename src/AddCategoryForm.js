
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, editCategory } from './actions/categories';
import { ModalFooter, Button, Input, Form, FormGroup, Label } from 'reactstrap';


const AddCategoryForm = ({ toggle, category }) => {
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);
    let initialState;
    if (category) {
        initialState = {

            name: category.name || "",
            description: category.description || ""
        };
    } else {
        initialState = {
            name: "",
            description: ""
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
        if (category) {
            dispatch(editCategory(token, formData, category.id)).catch(e => alert(e));
        } else {
            dispatch(addCategory(token, formData)).catch(e => alert(e));
        }

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
                    <Button color="primary" >Submit</Button>{' '}
                </ModalFooter>
            </Form>
        </div>
    );
};

export default AddCategoryForm;