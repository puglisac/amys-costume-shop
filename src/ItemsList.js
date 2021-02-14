import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from './actions/items';
import { Table } from 'reactstrap';
import FormModal from './FormModal';
import ItemRow from './ItemRow';
import { getAllCategories } from './actions/categories';
import { useParams } from 'react-router-dom';


const ItemsList = () => {
    const { token } = useSelector(st => st.token);
    const { currUser } = useSelector(st => st.currUser);
    const { items } = useSelector(st => st.items);
    const { category_id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllItems(token, category_id)).catch(e => alert(e));
        // dispatch(getAllCategories(token)).catch(e => alert(e));
    }, [currUser]);

    return (
        <div className="container">
            <Table className=" mt-4 shadow-sm p-2">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Item</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Categories</th>
                        <th>Quantity</th>
                        <th>Pulled?</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(items) ? items.map(i => <ItemRow key={i.id} item={i} currUser={currUser} />) : "Loading..."}
                </tbody>
            </Table>
            {currUser.is_admin ? <FormModal buttonLabel="Add Item" formType="item" /> : null}
        </div>
    );
};



export default ItemsList;
