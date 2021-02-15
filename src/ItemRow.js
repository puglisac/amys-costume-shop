import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GET_ITEMS } from './actions/actionTypes';
import AddToPullList from './AddToPullList';

const ItemRow = ({ item, currUser }) => {
    const { users } = useSelector(st => st.users);
    let initialState = false;
    let initialPulledText = "Not Available";

    if (currUser.is_admin && item.user) {
        initialPulledText = item.user.email;
        // console.log(item);
    } if (item.user_id) {
        initialState = true;
    }

    const [notAvailable, setNotAvailable] = useState(initialState);
    const [pulledText, setPulledText] = useState(initialPulledText);

    const categoriesNameArr = [];
    for (let category of item.categories) {
        categoriesNameArr.push(category.name);
    }

    useEffect(() => {
        if (!item.user_id) {
            setNotAvailable(false);
        }
    }, [item.user_id]);

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