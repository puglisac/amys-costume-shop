import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from './actions/items';
import { Table } from 'reactstrap';
import FormModal from './FormModal';
import CategoryRow from './CategoryRow';
import { getAllCategories } from './actions/categories';
import PaginationButtons from './PaginationButtons';
import { paginate } from './helpers';

const CategoriesList = () => {
    // a list of categories
    const { categories } = useSelector(st => st.categories);
    const { token } = useSelector(st => st.token);
    const { currUser } = useSelector(st => st.currUser);
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);
    const PAGESIZE = 15;
    let paginatedCategories;
    if (Array.isArray(categories)) {
        paginatedCategories = paginate(categories, pageNumber, PAGESIZE);
    }


    useEffect(() => {
        dispatch(getAllCategories(token)).catch(e => alert(e));
    }, []);

    return (
        <div className="container row">
            <div className="col-md-6 col-lg m-4">
                <h2>Categories</h2>
                {categories ? <p>Total: {categories.length}</p> : null}
                <Table className=" shadow p-2">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(categories) ? paginatedCategories.map(c => <CategoryRow key={c.id} category={c} />) : "Loading..."}
                    </tbody>
                </Table>
                {Array.isArray(categories) && categories.length > PAGESIZE ? <PaginationButtons page={pageNumber} setPage={setPageNumber} size={Math.ceil(categories.length / PAGESIZE)} /> : null}
                {currUser.is_admin ? <FormModal buttonLabel="Add Category" formType="categories" /> : null}
            </div>
        </div >
    );
};



export default CategoriesList;
