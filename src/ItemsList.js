import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from './actions/items';
import { Table } from 'reactstrap';
import FormModal from './FormModal';
import ItemRow from './ItemRow';
import { getAllCategories } from './actions/categories';
import { useParams } from 'react-router-dom';
import { paginate } from './helpers';
import './item_row.css';
import CategoryFilter from './CategoryFilter';
import PaginationButtons from './PaginationButtons';


const ItemsList = () => {
    // a list of items that can be filtered by categories in the filterArray
    const { token } = useSelector(st => st.token);
    const { currUser } = useSelector(st => st.currUser);
    const { items } = useSelector(st => st.items);
    const { category_id } = useParams();
    const dispatch = useDispatch();

    // handles pagination
    const [pageNumber, setPageNumber] = useState(1);
    const PAGESIZE = 15;
    let paginatedItems;
    if (Array.isArray(items)) {
        paginatedItems = paginate(items, pageNumber, PAGESIZE);
    }

    const { categories } = useSelector(st => st.categories);

    let initialState = [];
    if (category_id) {
        initialState = [category_id];
    }
    const [filterArray, setFilterArray] = useState(initialState);

    // filters items by category
    const filterItems = () => {
        const categoryString = filterArray.join(",");
        dispatch(getAllItems(token, categoryString)).catch(e => alert(e));
    };

    useEffect(() => {
        filterItems();
        if (!category_id) {
            dispatch(getAllCategories(token)).catch(e => alert(e));
        }
    }, [filterArray]);

    return (
        <div className="container row">
            {category_id || !Array.isArray(categories) ? null : <CategoryFilter categories={categories} filterArray={filterArray} setFilterArray={setFilterArray} />}
            <div className="col-md-6 col-lg m-4">
                <h2>Items</h2>
                {items ? <p>Total: {items.length}</p> : null}
                <Table className=" shadow p-2">
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
                        {Array.isArray(items) ? paginatedItems.map(i => <ItemRow key={i.id} item={i} currUser={currUser} />) : "Loading..."}
                    </tbody>
                </Table>
                {Array.isArray(items) && items.length > PAGESIZE ? <PaginationButtons page={pageNumber} setPage={setPageNumber} size={Math.ceil(items.length / PAGESIZE)} /> : null}
                {currUser.is_admin && !category_id ? <FormModal buttonLabel="Add Item" formType="item" /> : null}
            </div>
        </div>
    );
};



export default ItemsList;
