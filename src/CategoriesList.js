import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from './actions/items';
import { Table } from 'reactstrap';
import FormModal from './FormModal';
import CategoryRow from './CategoryRow';
import { getAllCategories } from './actions/categories';


const CategoriesList = () => {
    const { categories } = useSelector(st => st.categories);
    const { token } = useSelector(st => st.token);
    const { currUser } = useSelector(st => st.currUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories(token)).catch(e => alert(e));
    }, []);

    return (
        <div className="container">
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {categories ? categories.map(c => <CategoryRow key={c.id} category={c} />) : "Loading..."}
                </tbody>
            </Table>
            {currUser.is_admin ? <FormModal buttonLabel="Add Category" formType="addCategories" /> : null}
        </div>
    );
};



export default CategoriesList;
