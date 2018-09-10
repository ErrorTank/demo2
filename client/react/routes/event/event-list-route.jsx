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


export class EventListRoute extends React.Component {
    constructor(props) {
        super(props);
        this.seasons = [
            {
                label: () => "Current Season",
                value: () => ({currentSeason: true})
            }, {
                label: () => "Last Season",
                value: () => ({lastSeason: true})
            }, {
                label: () => "All Seasons",
                value: () => null
            }, {
                special: true,
                label : () =>{
                    let {season} = this.state;
                    let dateLabel = !season.hasOwnProperty("from") ? "" :
                        ` (${formatDate(season.from, "MM/DD/YY")} - ${formatDate(season.to, "MM/DD/YY")})`;
                    return `Date Range${dateLabel}`
                },
                value: () => {
                    let {season} = this.state;
                    return !season.hasOwnProperty("from") ? null : season
                }
            }


        ];
        this.state = {
            org: null,
            kw: "",
            orgs: [],
            season: this.seasons[0],
        };

        orgApi.getBriefs().then(orgs => this.setState({orgs}))
    };

    changeSeason = (ss) => {
        if(!ss.hasOwnProperty("special")){
            this.setState({season: ss})
        }else{
            const modal = modals.openModal({
                content: (
                    <DatePickerModal
                        onConfirm={(season) => this.setState({season})}
                        onDismiss={(val) => {
                            if(val === null){
                                this.setState({season: this.seasons[0]})
                            }
                            modal.dismiss();
                        }}
                    />
                ),
            });
        }
    };

    render() {
        let {org, orgs, kw, season} = this.state;
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
                            {/*<DataTable*/}
                            {/*filter={{keyword: kw, orgID: org ? org.id : null}}*/}
                            {/*api={api}*/}
                            {/*columns={columns}*/}
                            {/*className="venue-table"*/}
                            {/*rowLinkTo={venue => "/venue/" + venue.id}*/}
                            {/*pageSize={50}*/}
                            {/*/>*/}
                        </div>
                    </div>
                </div>
            </InitTitle>
        );
    }
}
