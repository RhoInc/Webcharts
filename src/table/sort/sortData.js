import clone from '../../util/clone';

export default function sortData(data) {
    let sortedData = data ? clone(data) : clone(this.data.raw);
    sortedData = sortedData.sort((a, b) => {
        let order = 0;

        this.sort.order.forEach(item => {
            const aCell = a[item.col],
                bCell = b[item.col];

            if (order === 0) {
                if (
                    (item.direction === 'ascending' && aCell < bCell) ||
                    (item.direction === 'descending' && aCell > bCell)
                )
                    order = -1;
                else if (
                    (item.direction === 'ascending' && aCell > bCell) ||
                    (item.direction === 'descending' && aCell < bCell)
                )
                    order = 1;
            }
        });

        return order;
    });

    this.data.sorted = sortedData;

    return sortedData;
}
