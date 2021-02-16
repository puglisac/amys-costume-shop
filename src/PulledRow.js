import React, { memo } from 'react';
import RemoveFromListBtn from './RemoveFromListBtn';
import './item_row.css';

const PulledRow = memo(({ item, currUser }) => {
    // shows row for item pulled by a user
    return (<tr className="item_row">
        <td><img src={item.image_path} /></td>
        <th><a href={`/items/${item.id}`}>{item.name}</a></th>
        <td>{item.location}</td>
        <td>{item.description}</td>
        <td>{item.quantity}</td>
        {currUser.is_admin ? <RemoveFromListBtn itemId={item.id} /> : null}
    </tr>);
});
export default PulledRow;