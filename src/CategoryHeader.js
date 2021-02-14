import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import { getOneCategory } from './actions/categories';
import FormModal from './FormModal';

const CategoryHeader = () => {
    const dispatch = useDispatch();
    const { category_id } = useParams();
    const { categories } = useSelector(st => st.categories);
    const { token } = useSelector(st => st.token);

    useEffect(() => {
        dispatch(getOneCategory(token, category_id));
    }, []);

    return (
        <div className="container">
            <Jumbotron>
                <h1 className="display-3">{categories.name}</h1>
                <p className="lead">{categories.description}</p>
                <FormModal />
            </Jumbotron>
        </div>
    );
};

export default CategoryHeader;