import React, { useState, memo } from 'react';
import { Button } from 'reactstrap';

const FilterButton = memo(({ category, add, remove }) => {
    // a button that adds or removes the category.id to the filterArray
    const [outlined, setOutlined] = useState(true);
    const addOrRemove = () => {
        if (outlined) {
            add(category.id);
        } else {
            remove(category.id);
        }
        setOutlined(!outlined);
    };


    return (<button className={outlined ? "btn btn-outline-primary m-2" : "btn btn-primary m-2"} onClick={addOrRemove}>{category.name}</button>);
});

export default FilterButton;