import React, { memo } from 'react';

const CategoryRow = memo(({ category }) => {
    // a row of category info
    return (<tr>
        <th><a href={`/categories/${category.id}`}>{category.name}</a></th>
        <td>{category.description}</td>
    </tr>);
});
export default CategoryRow;