import React from "react";
import {customHistory} from "../../main-route";
import {Pagination} from "../pagination/pagination";

export class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            sort: null,
            rows: [],
            total: null,
            loading: false
        };
        this.loadData(this.props);
    };

    componentWillReceiveProps(nextProps) {
        let {filter} = this.props;
        let {filter: nextFilter} = nextProps;
        if (filter.keyword !== nextFilter.keyword || filter.orgID !== nextFilter.orgID) {
            this.loadData(nextProps);
        }
    };

    loadData = (changes = {}) => {
        let {pageSize, filter, api} = changes;
        let {page, sort} = this.state;
        return api({skip: (page - 1) * pageSize, take: pageSize, filter, sort}).then(result => {
            this.setState({
                rows: result.rows,
                total: result.total
            })
        })
    };

    handleSort = sortKey => {
        let {sort} = this.state;
        let nextSort = sort === null ? {orderBy: sortKey, orderAsc: true} : sort.orderAsc === true ? {orderBy: sortKey, orderAsc: false} : null;
        this.setState({sort: nextSort}, () => {
            this.loadData(this.props);
        })
    };

    renderSortIcon = isAsc => {
        return isAsc ? (
            <i className="fas fa-arrow-up"/>
        ): (
            <i className="fas fa-arrow-down"/>
        )
    };

    render() {
        let {className, columns, rowLinkTo, pageSize} = this.props;
        let {rows, page, total, sort} = this.state;
        return (
            <div className={`data-table ${className}`}>
                <div className="table-wrap">
                    <table>
                        <thead>
                        <tr>
                            {columns.map((each, i) => (
                                <th key={i}
                                    onClick={() => this.handleSort(each.sortKey)}
                                >
                                    {each.label}
                                    {sort && (sort.orderBy === each.sortKey && this.renderSortIcon(sort.orderAsc))}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {rows.length ?
                            rows.map((each, i) => (
                                <tr key={i}
                                    className="data-item"
                                    onClick={() => customHistory.push(rowLinkTo(each))}
                                >
                                    {columns.map((col, j) => (
                                        <th key={j}
                                        >
                                            {col.cellDisplay(each)}
                                        </th>
                                    ))}
                                </tr>
                            )): (
                                <tr>
                                    <td colSpan="3">No data</td>
                                </tr>
                            )

                        }
                        </tbody>
                    </table>
                </div>

                <div className="table-footer">
                    <div className="summary">
                        {pageSize * page - pageSize + 1} to {pageSize * page - pageSize + rows.length} of {total} records shown
                    </div>
                    <div className="pagination-wrap">
                        <Pagination
                            value={page}
                            total={Math.ceil(total / pageSize)}
                            onClick={(val) => this.setState({page: val}, () => this.loadData(this.props))}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
