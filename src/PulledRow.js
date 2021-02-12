import React, { useState } from 'react';
import RemoveFromListBtn from './RemoveFromListBtn';

const PulledRow = ({ item, currUser }) => {

    return (<tr>
        <td>{item.image_path}</td>
        <th><a href="#">{item.name}</a></th>
        <td>{item.location}</td>
        <td>{item.description}</td>
        <td>{item.quantity}</td>
        {currUser.is_admin ? <RemoveFromListBtn itemId={item.id} /> : null}
    </tr>);
};
export default PulledRow;