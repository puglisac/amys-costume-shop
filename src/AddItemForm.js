
import React, { useEffect, useState, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem, removeItem } from './actions/items';
import { useHistory } from 'react-router-dom';
import { ModalFooter, InputGroupAddon, Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { getAllCategories } from './actions/categories';
import AreYouSure from './AreYouSure';


const AddItemForm = memo(({ toggle, item }) => {
    // form to add/edit items
    const dispatch = useDispatch();
    const history = useHistory();
    const { token } = useSelector(st => st.token);
    const { categories } = useSelector(st => st.categories);
    let initialState;
    if (item) {
        const categoriesArr = [];
        for (let category of item.categories) {
            categoriesArr.push(category.id);
        }
        // sets the form data to existing item data if editing item
        initialState = {

            name: item.name || "",
            location: item.location || "",
            description: item.description || "",
            quantity: item.quantity || "",
            image_path: item.image_path || "",
            categories: categoriesArr || []
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
    // handles form inputs
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }));
    };

    // handles the multiple select field
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

    // on submit adds or edits the item
    const handleSubmit = (e) => {
        e.preventDefault();
        const file = document.getElementById("item-image");
        // if (file.files[0]) {
        //     data.append('image', file.files[0]);
        // }
        if (item) {
            dispatch(editItem(token, formData, file.files[0], item.id)).catch(e => alert(e));
        }
        else {
            dispatch(addItem(token, formData, file.files[0])).catch(e => alert(e));
        }
        toggle();
    };
    // delete's an item and redirects the user to the /items page
    const deleteItem = useCallback(() => {
        dispatch(removeItem(token, item.id)).then(() => history.push("/items")).catch(e => alert(e));
    }, []);

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
                        id="item-image"
                        placeholder="Item image"
                        name="image_path"
                        value={formData.image_path}
                        onChange={handleChange} />
                </FormGroup>
                <ModalFooter>
                    <Button color="primary" >Submit</Button>{' '}
                </ModalFooter>
            </Form>
            {item ? <AreYouSure buttonLabel="Delete Item" onClick={deleteItem} /> : null}
        </div>
    );
});

export default AddItemForm;