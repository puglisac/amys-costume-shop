
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem } from './actions/items';
import { ModalFooter, InputGroupAddon, Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { getAllCategories } from './actions/categories';


const AddItemForm = ({ toggle, item = null }) => {
    const dispatch = useDispatch();
    const { token } = useSelector(st => st.token);
    const { categories } = useSelector(st => st.categories);
    let initialState;
    if (item) {
        const categoriesArr = [];
        for (let category of item.categories) {
            categoriesArr.push(category.id);
        }
        initialState = {

            name: item.name || "",
            location: item.location || "",
            description: item.description || "",
            quantity: item.quantity || "",
            categories: categoriesArr || [],
            image_path: item.image_path || ""
        };
    } else {
        initialState = {
            name: "",
            location: "",
            description: "",
            quantity: "",
            image_path: "",
            categories: []
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

    const handleSelect = (e) => {
        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
                setFormData(data => ({
                    ...data,
                    categories: value
                }));
            }
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (item) {
            console.log(formData);
            dispatch(editItem(token, formData, item.id)).catch(e => alert(e));
        }
        else {
            dispatch(addItem(token, formData)).catch(e => alert(e));
        }
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
                    <Label for="categories">Categories</Label>
                    <Input type="select"
                        name="categories"
                        id="categories"
                        onChange={handleSelect}
                        value={formData.categories}
                        multiple>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Input>
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
                    <Button color="primary" >Submit</Button>{' '}
                </ModalFooter>
            </Form>
        </div>
    );
};

export default AddItemForm;