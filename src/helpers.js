// accepts an array, a page nunber, and the number of items per page.
// returns an array
function paginate(arr, pageNum, pageSize) {
    const size = Math.ceil(arr.length / pageSize);
    if (pageNum > size) {
        pageNum = size;
    }
    if (pageNum < 1) {
        pageNum = 1;
    }
    const startIndex = (pageNum - 1) * pageSize;
    return arr.slice(startIndex, startIndex + pageSize);
}
export { paginate };