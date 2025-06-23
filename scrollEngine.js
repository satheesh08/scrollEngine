import {
    LightningElement,
    api,
    track
} from 'lwc';

export default class ScrollEngine extends LightningElement {


    @api columns;
    @api data;
    @api tableHeight = 300;
    @track isLoading = false;

    rowHeight = 40;
    buffer = 5;

    @track searchKey = '';
    @track visibleData = [];
    @track sortBy = null;
    @track sortDirection = 'asc';

    scrollTop = 0;
    parsedColumns = [];
    parsedData = [];
    filteredData = [];

    connectedCallback() {
        this.isLoading = true;
        try {
            this.parsedColumns = this.columns ?
                (typeof this.columns === 'string' ? JSON.parse(this.columns) : this.columns) :
                [{
                        label: 'Id',
                        fieldName: 'Id'
                    },
                    {
                        label: 'Name',
                        fieldName: 'name'
                    },
                    {
                        label: 'Email',
                        fieldName: 'email'
                    }
                ];

            this.parsedData = this.data ?
                (typeof this.data === 'string' ? JSON.parse(this.data) : this.data) :
                Array.from({
                    length: 500
                }, (_, i) => ({
                    Id: `ID-${i + 1}`,
                    name: `User ${i + 1}`,
                    email: `user${i + 1}@example.com`
                }));
        } catch (e) {
            console.error('Failed to parse input JSON:', e);
            this.parsedColumns = [];
            this.parsedData = [];
        }

        this.filteredData = [...this.parsedData];
        this.updateVisibleRows();

        setTimeout(() => {
            this.isLoading = false;
        }, 300);
    }

    get showEmpty() {
        return !this.isLoading && this.filteredData.length === 0;
    }


    get containerStyle() {
        const height = Number(this.tableHeight) || 300;
        return `height: ${height}px`;
    }

    get spacerStyleTop() {
        return `height:${this.startIndex * this.rowHeight}px`;
    }

    get spacerStyleBottom() {
        const after = this.filteredData.length - this.endIndex;
        return `height:${after * this.rowHeight}px`;
    }

    handleScroll(event) {
        this.scrollTop = event.target.scrollTop;
        this.updateVisibleRows();
    }

    get startIndex() {
        return Math.max(0, Math.floor(this.scrollTop / this.rowHeight) - this.buffer);
    }

    get endIndex() {
        return Math.min(
            this.filteredData.length,
            Math.ceil((this.scrollTop + Number(this.tableHeight)) / this.rowHeight) + this.buffer
        );
    }

    updateVisibleRows() {
        this.visibleData = this.filteredData.slice(this.startIndex, this.endIndex).map(row => {
            const _cells = this.parsedColumns.map(col => ({
                key: col.fieldName,
                value: row[col.fieldName] ?? ''
            }));
            return {
                ...row,
                _cells
            };
        });
    }


    handleSearch(event) {
        this.searchKey = event.target.value.toLowerCase();
        this.filterData();
    }


    filterData() {
        if (!this.searchKey) {
            this.filteredData = [...this.parsedData];
        } else {
            this.filteredData = this.parsedData.filter(row => {
                return this.parsedColumns.some(col => {
                    const value = row[col.fieldName];
                    return value && value.toString().toLowerCase().includes(this.searchKey);
                });
            });
        }
        this.scrollTop = 0;
        this.updateVisibleRows();
        this.resetScrollPosition();

        setTimeout(() => {
            this.isLoading = false;
        }, 300);

    }

    handleSort(event) {
        const fieldName = event.currentTarget.dataset.field;
        if (!fieldName) return;

        if (this.sortBy === fieldName) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortBy = fieldName;
            this.sortDirection = 'asc';
        }

        const dataToSort = [...this.filteredData];
        dataToSort.sort((a, b) => {
            const aVal = a[fieldName] || '';
            const bVal = b[fieldName] || '';
            if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        this.filteredData = dataToSort;
        this.scrollTop = 0;
        this.updateVisibleRows();
        this.resetScrollPosition();

        setTimeout(() => {
            this.isLoading = false;
        }, 300);

    }

    get displayColumns() {
        return this.parsedColumns.map(col => {
            const isSorted = this.sortBy === col.fieldName;
            return {
                ...col,
                isSorted,
                sortSymbol: isSorted ? (this.sortDirection === 'asc' ? '▲' : '▼') : '',
                sortIcon: isSorted ?
                    (this.sortDirection === 'asc' ? 'utility:arrowup' : 'utility:arrowdown') :
                    'utility:unmuted'
            };
        });
    }

    resetScrollPosition() {
        const scrollContainer = this.template.querySelector('.table-body');
        if (scrollContainer) {
            scrollContainer.scrollTo(0, 0);
        }
    }
}
