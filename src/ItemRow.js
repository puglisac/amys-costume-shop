import React from 'react';

const ItemRow = ({ item }) => {

    return (<tr>
        <td>{item.image_path}</td>
        <th><a href="#">{item.name}</a></th>
        <td>{item.location}</td>
        <td>{item.description}</td>
        <td>{item.quantity}</td>
    </tr>);
};
export default ItemRow;