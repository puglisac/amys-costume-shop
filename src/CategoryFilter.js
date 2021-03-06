import React, { memo, useCallback, useState } from 'react';
import { Button } from 'reactstrap';
import FilterButton from './FilterButton';

const CategoryFilter = memo(({ categories, filterArray, setFilterArray }) => {
    // a selection of buttons to filter items by categories
    const addToFilter = useCallback((id) => {
        setFilterArray([...filterArray, id]);
    }, [filterArray]);
    const removeFromFilter = useCallback((id) => {
        setFilterArray(filterArray.filter(cat_id => cat_id != id));
    }, [filterArray]);
    return (
        <div className="col-md-2 mt-4">
            <div className="col">
                <h4>Filter by Category</h4>
                {categories.map(c => <FilterButton key={c.id} category={c} add={addToFilter} remove={removeFromFilter} />)}
            </div>
        </div>
    );
});

export default CategoryFilter;