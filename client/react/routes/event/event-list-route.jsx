import React from "react";
import {InitTitle} from "../../common/init-title/init-title";
import {customHistory} from "../../main-route";
import {InputSearch} from "../../common/input-search/input-search";
import {SelectWithSearch} from "../../common/select-with-search/select-with-search";
import {DataTable} from "../../common/data-table/data-table";
import {orgApi} from "../../../api/common/app/org-api";
import {CommonSelect} from "../../common/common-select/common-select";
import _ from "lodash"
import {formatDate} from "../../utils/date-utils";
import {modals} from "../../common/modals/modals";
import {DatePickerModal} from "../../common/modals/date-picker-modal/date-picker-modal";
import {venueApi} from "../../../api/common/app/venue-api";
import {eventApi} from "../../../api/common/app/event-api";


export class EventListRoute extends React.Component {
    constructor(props) {
        super(props);
        this.seasons = [
            {
                label: () => "Current Season",
                value: ({currentSeason: true})
            }, {
                label: () => "Last Season",
                value: ({lastSeason: true})
            }, {
                label: () => "All Seasons",
                value: null
            }, {

                label : () =>{
                    let {date} = this.state;
                    let dateLabel = !date ? "" :
                        ` (${formatDate(date.from, "MM/DD/YY")} - ${formatDate(date.to, "MM/DD/YY")})`;
                    return `Date Range${dateLabel}`
                },
                getValue: () => {
                    let {date} = this.state;
                    return date && ({from: formatDate(date.from, "YYYY-MM-DD"), thru: formatDate(date.to, "YYYY-MM-DD")})
                },
                action: (thisFilter) => this.openDateRangeModal(this.state.date).then((dates) => this.setState({season: thisFilter, date: dates}))
            }


        ];
        this.state = {
            org: null,
            kw: "",
            orgs: [],
            season: this.seasons[0],
            date: null
        };

        orgApi.getBriefs().then(orgs => this.setState({orgs}))
    };

    openDateRangeModal = (defaultDates) => {
        const modal = modals.openModal({
            content: (
                <DatePickerModal
                    value={defaultDates}
                    onConfirm={(dates) => {
                        modal.close(dates)
                    }}
                    onDismiss={(val) => {
                        if(val === null){
                            this.setState({season: this.seasons[0]})
                        }
                        modal.dismiss();
                    }}
                />
            ),
        });
        return modal.result;
    };

    changeSeason = (ss) => {
        if (ss.action) {
            ss.action(ss);
        } else {
            this.setState({
                season: ss,
            });
        }
    };

    render() {
        let {org, kw, season, orgs} = this.state;

        const api = (params) => {
            return eventApi.getEventsOverview(params).then((result) => ({rows: result.overviews, total: result.total}));
        };
        return (
            <InitTitle title="Event List">
                <div className="event-list-route">
                    <div className="route-header">
                        <p className="title">
                            Events
                        </p>
                        <button className="to-add-event"
                                onClick={() => customHistory.push("/event-new")}
                        >
                            Add Event
                        </button>
                    </div>
                    <div className="route-body">
                        <div className="action-panel">
                            <InputSearch
                                className="search-event"
                                onSearch={kw => this.setState({kw})}
                            />
                            <SelectWithSearch
                                className="select-org"
                                placeholder="All Organizations"
                                list={orgs}
                                value={org}
                                displayAs={(org) => org.name}
                                onPick={org => this.setState({org})}
                            />
                            <CommonSelect
                                className={`select-season`}
                                onChange={val => this.changeSeason(val)}
                                list={this.seasons}
                                displayAs={ss => {
                                    return ss.label();
                                }}
                                value={season || ""}
                                compare={(target, value) => _.isEqual(target, value)}
                            />
                        </div>
                        <div className="table-wrap">
                            <DataTable
                            filter={{keyword: kw, orgID: org ? org.id : null, season: season ? season.getValue ? season.getValue() : season.value : null}}
                            api={api}
                            columns={columns}
                            className="event-table"
                            rowLinkTo={event => "/event/" + event.id + "/details"}
                            pageSize={50}
                            />
                        </div>
                    </div>
                </div>
            </InitTitle>
        );
    }
}

const columns = [{
    label: "Event Title",
    sortKey: "title",
    cellDisplay: (event) => event.title
}, {
    label: "Date",
    sortKey: "date_time",
    cellDisplay: (event) => (
        <div>
            {formatDate(Object.assign({}, event.date_time, {month: event.date_time.month - 1}), "MMM DD, YYYY")}
            { event.disabled && <div style={{color: "red"}}>Disabled</div>}
        </div>
    )
}, {
    label: "Organization",
    sortKey: "organization",
    cellDisplay: (event) => event.organization.name
}, {
    label: "Outings",
    sortKey: "outing_count",
    cellDisplay: (event) =>event.outing_count
}, {
    label: "Total Tickets",
    sortKey: "ticket_count",
    cellDisplay: (event) => event.ticket_count
},  {
    label: "Sold",
    sortKey: "tickets_sold",
    cellDisplay: (event) => `${event.tickets_sold} ($${event.collected})`
}];
