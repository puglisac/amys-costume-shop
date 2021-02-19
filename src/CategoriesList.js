import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from './actions/items';
import { Table } from 'reactstrap';
import FormModal from './FormModal';
import CategoryRow from './CategoryRow';
import { getAllCategories } from './actions/categories';


const CategoriesList = () => {
    // a list of categories
    const { categories } = useSelector(st => st.categories);
    const { token } = useSelector(st => st.token);
    const { currUser } = useSelector(st => st.currUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories(token)).catch(e => alert(e));
    }, []);

    return (
        <div className="container row m-4">
            <div className="col-md-6 col-lg m-4">
                <h2>Categories</h2>
                <p>Total: {categories.length}</p>
                <Table className=" shadow p-2">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(categories) ? categories.map(c => <CategoryRow key={c.id} category={c} />) : "Loading..."}
                    </tbody>
                </Table>
                {currUser.is_admin ? <FormModal buttonLabel="Add Category" formType="categories" /> : null}
            </div>
        </div >
    );
};



export default CategoriesList;
