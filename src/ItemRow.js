import React, { useState } from 'react';
import { GET_ITEMS } from './actions/actionTypes';
import AddToPullList from './AddToPullList';

const ItemRow = ({ item, currUser }) => {

    let initialState = false;
    let initialPulledText;
    if (currUser.is_admin && item.user_email) {
        initialState = true;
        initialPulledText = item.user_email;
    } else if (item.user_email == currUser.email) {
        initialState = true;
        initialPulledText = "Item Added";
    }
    const [notAvailable, setNotAvailable] = useState(initialState);
    const [pulledText, setPulledText] = useState(initialPulledText);
    const categoriesNameArr = [];
    for (let category of item.categories) {
        categoriesNameArr.push(category.name);
    }


    return (<tr>
        <td>{item.image_path}</td>
        <th><a href={`items/${item.id}`}>{item.name}</a></th>
        <td>{item.location}</td>
        <td>{item.description}</td>
        <td>{categoriesNameArr.join(", ")}</td>
        <td>{item.quantity}</td>
        {notAvailable ? <td>{pulledText}</td> : <AddToPullList itemId={item.id} email={currUser.email} setNotAvailable={setNotAvailable} setText={setPulledText} />}
    </tr>);
};
export default ItemRow;