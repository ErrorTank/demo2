import React from "react";
import {orderApi} from "../../../../api/common/app/order-api";
import {customHistory} from "../../../main-route";
import {InputSearch} from "../../../common/input-search/input-search";
import {SelectWithSearch} from "../../../common/select-with-search/select-with-search";
import {CommonSelect} from "../../../common/common-select/common-select";
import {DataTable} from "../../../common/data-table/data-table";
import {formatDate, toDate} from "../../../utils/date-utils";
import {searchUtils} from "../../../utils/search-utils";

const optInsFilterList = [{
    label: "All Opt-ins",
    filterFunc: (optIn) => optIn && optIn.opt_ins.length > 0
},{
    label: "All Open Opt-ins",
    filterFunc: (optIn) => optIn && optIn.opt_in_status === 0 && optIn.opt_ins.length > 0
},{
    label: "All Done Opt-ins",
    filterFunc: (optIn) => optIn.opt_in_status === 1
},{
    label: "All Buyers",
    filterFunc: (optIn) => true
}];

export class EventBuyerReport extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            orders: [],
            optInsFilter: optInsFilterList[0]
        };
        orderApi.getOrdersForEvent(props.eventID).then(orders => this.setState({orders}))

    };

    indexes = {
        "customer.full_name": "String",
        "customer.email": "String",
        "number": "Number"
    };
    render(){
        const { optInsFilter, keyword, orders} = this.state;

        const filteredOrders = searchUtils.simpleSearch(orders.filter((order) => {
            return optInsFilter.filterFunc(order)
        }), this.indexes, keyword);
        console.log(keyword)
        console.log(searchUtils.simpleSearch(orders.filter((order) => {
            return optInsFilter.filterFunc(order)
        }), this.indexes, keyword));
        return(
            <div className="event-buyer-report">
                <div className="route-header">
                    <p className="title">
                        Buyer Report
                    </p>

                </div>
                <div className="route-body">
                    <div className="action-panel">
                        <InputSearch
                            className="search-opt-ins"
                            onSearch={kw => this.setState({keyword: kw})}
                        />
                        <CommonSelect
                            className={`select-opt-ins`}
                            onChange={val => this.setState({optInsFilter: val})}
                            list={optInsFilterList}
                            displayAs={each => {
                                return each.label;
                            }}
                            value={optInsFilter || ""}
                            compare={(target, value) => _.isEqual(target, value)}
                        />
                    </div>
                    <div className="table-wrap">
                        <DataTable
                            rows={filteredOrders}
                            columns={buyerReportCols}
                            className="buyer-report-table"
                            pageSize={50}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

let buyerReportCols = [
    {
        label: (<span>Name <br/> Email</span>),
        cellDisplay: (row) => (
            <div>
                <strong>{row.customer.full_name}</strong>
                <br/>
                <a href={`mailto:${row.customer.email}`}>{row.customer.email}</a>
            </div>
        ),
    }, {
        label: "Type",
        cellDisplay: (row) => row.attendee == false ? "Buyer" : "Attendee"
    }, {
        label: (<span>Tickets <br/> Order </span>),
        cellDisplay: (row) => (
            <div>{row.tickets} <br/> {row.number} <br/></div>
        ),
    }, {
        label: (<span>Add-ons</span>),
        cellDisplay: (row) => (
            <div>{row.addOns}</div>
        ),
    }, {
        label: (<span>Donations</span>),
        cellDisplay: (row) => (
            <div>{row.donations}</div>
        ),
    }, {
        label: (<span>Ticketing <br /> Provider</span>),
        cellDisplay: (row) => (
            <div >CID: {row.event_service ? (row.event_service.customer_id || "n/a") : "n/a"} <br /> OID: {row.event_service ? (row.event_service.order_id || "n/a") : "n/a"}</div>
        ),
    }, {
        label: "Seats",
        cellClass: "cell-seats",
        cellDisplay: (row) => {
            if (!row.seats || row.seats.length == 0) return null;

            return (
                <ul className="seats">
                    { row.seats.map((item, index) => (
                        <li key={index}>{item}
                        </li>
                    ))}
                </ul>
            )
        }
    }, {
        label: "Date",
        cellDisplay: (row) => formatDate(toDate(row.date))
    }, {
        label: "Outing",
        cellDisplay: (row) => row.outing_title
    }, {
        label: "Sales Rep",
        cellDisplay: (row) => row.sales_rep.full_name
    }
];
