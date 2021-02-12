import React from 'react';

const ItemRow = ({ item, currUser }) => {
    return (<tr>
        <td>{item.image_path}</td>
        <th><a href="#">{item.name}</a></th>
        <td>{item.location}</td>
        <td>{item.description}</td>
        <td>{item.quantity}</td>
        {item.user_email && currUser.isAdmin ? <td>{item.user_email}</td> : null}
        {item.user_email && !currUser.isAdmin ? <td>Not Aailable</td> : null}
    </tr>);
};
export default ItemRow;