import React from 'react';
import AddToPullList from './AddToPullList';

const ItemRow = ({ item, currUser }) => {

    let notAvailable = "Not Available";
    if (currUser.is_admin && item.user_email) {
        notAvailable = item.user_email;
    }

    return (<tr>
        <td>{item.image_path}</td>
        <th><a href="#">{item.name}</a></th>
        <td>{item.location}</td>
        <td>{item.description}</td>
        <td>{item.quantity}</td>
        {item.user_email ? <td>{notAvailable}</td> : <AddToPullList itemId={item.id} email={currUser.email} />}
    </tr>);
};
export default ItemRow;