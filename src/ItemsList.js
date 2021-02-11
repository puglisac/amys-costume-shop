import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from './actions/items';
import { Table } from 'reactstrap';
import FormModal from './FormModal';
import ItemRow from './ItemRow';


const ItemsList = () => {
    const { items } = useSelector(st => st.items);
    const { token } = useSelector(st => st.token);
    const { currUser } = useSelector(st => st.currUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllItems(token)).catch(e => alert(e));
    }, []);

    return (
        <div className="container">
            <Table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Item</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {items ? items.map(i => <ItemRow key={i.id} item={i} />) : "Loading..."}
                </tbody>
            </Table>
            {currUser.is_admin ? <FormModal buttonLabel="Add Item" formType="addItem" /> : null}
        </div>
    );
};



export default ItemsList;
