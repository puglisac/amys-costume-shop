import React, { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { GET_ITEMS } from './actions/actionTypes';
import AddToPullList from './AddToPullList';

const ItemRow = memo(({ item, currUser }) => {
    let initialState = false;
    let initialPulledText = "Not Available";


    const [notAvailable, setNotAvailable] = useState(initialState);
    const [pulledText, setPulledText] = useState(initialPulledText);

    const categoriesNameArr = [];
    for (let category of item.categories) {
        categoriesNameArr.push(category.name);
    }

    useEffect(() => {
        if (!item.user_id) {
            setNotAvailable(false);
        } else {
            setNotAvailable(true);
        }
        if (currUser.is_admin && item.user) {
            setPulledText(item.user.email);
        } if (item.user && currUser.email == item.user.email) {
            setPulledText("In your pull-list");
        }
    }, [item.user_id]);

    return (<tr>
        <td>{item.image_path}</td>
        <th><a href={`items/${item.id}`}>{item.name}</a></th>
        <td>{item.location}</td>
        <td>{item.description}</td>
        <td>{categoriesNameArr.join(", ")}</td>
        <td>{item.quantity}</td>
        {notAvailable ? <td>{pulledText}</td> : <td><AddToPullList itemId={item.id} email={currUser.email} setNotAvailable={setNotAvailable} setText={setPulledText} /></td>}
    </tr>);
});
export default ItemRow;