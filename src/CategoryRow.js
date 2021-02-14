import React from 'react';

const CategoryRow = ({ category }) => {

    return (<tr>
        <th><a href={`/categories/${category.id}`}>{category.name}</a></th>
        <td>{category.description}</td>
    </tr>);
};
export default CategoryRow;