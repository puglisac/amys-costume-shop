import React, { memo, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationButtons = memo(({ page, setPage, size }) => {
    // shows pagination buttons to navigate through lists
    const pageNumberArray = [];

    for (let p = page - 5; p <= page + 5; p++) {
        if (p > 0 && p <= size) {
            pageNumberArray.push(p);
        }
    }

    return (
        <Pagination aria-label="Page navigation">
            <PaginationItem disabled disabled={page == 1}>
                <PaginationLink first onClick={() => setPage(1)} />
            </PaginationItem>
            <PaginationItem disabled={page == 1}>
                <PaginationLink previous onClick={() => setPage(page - 1)} />
            </PaginationItem>

            {pageNumberArray.map(p => {
                return (<PaginationItem active={p == page}>
                    <PaginationLink onClick={() => setPage(p)}>
                        {p}
                    </PaginationLink>
                </PaginationItem>);
            })}

            <PaginationItem disabled={page == size}>
                <PaginationLink next onClick={() => setPage(page + 1)} />
            </PaginationItem>
            <PaginationItem disabled={page == size}>
                <PaginationLink last onClick={() => setPage(size)} />
            </PaginationItem>
        </Pagination>
    );
});

export default PaginationButtons;