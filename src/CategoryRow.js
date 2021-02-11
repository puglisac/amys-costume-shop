import React from 'react';

const CategoryRow = ({ category }) => {

    return (<tr>
        <th><a href="#">{category.name}</a></th>
        <td>{category.description}</td>
    </tr>);
};
export default CategoryRow;