import React from "react";
import {InitTitle} from "../../common/init-title/init-title";
import {customHistory} from "../../main-route";
import {venueApi} from "../../../api/common/app/venue-api";
import {InputSearch} from "../../common/input-search/input-search";
import {SelectWithSearch} from "../../common/select-with-search/select-with-search";
import {orgApi} from "../../../api/common/app/org-api";
import {DataTable} from "../../common/data-table/data-table";

export class VenueListRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            org: null,
            kw: "",
            orgs: []
        };
        orgApi.getBriefs().then(orgs => this.setState({orgs}))
    };




    render() {

        let {org, orgs, kw} = this.state;
        const columns = [ {
            label: "Venue Name",
            cellDisplay: (venue)=> venue.name,
            sortKey: "name"
        }, {
            label: "Organization",
            cellDisplay: (venue)=> venue.organization.name,
            sortKey: "organization"
        }, {
            label: "Location",
            cellDisplay: (venue)=> venue.address ? venue.address.city : "",
            sortKey: "city"
        }];
        const api = (params) => {
            return venueApi.getVenuesOverview(params).then((result) => ({rows: result.overviews, total: result.total}));
        };
        return (
            <InitTitle
                title="Venue List"
            >
                <div className="venue-list-route">
                    <div className="route-header">
                        <p className="title">
                            Venues
                        </p>
                        <button className="to-add-venue"
                                onClick={() => customHistory.push("/venue-new")}
                        >
                            Add Venue
                        </button>
                    </div>
                    <div className="route-body">
                        <div className="action-panel">
                            <InputSearch
                                className="search-venue"
                                onSearch={kw => this.setState({kw})}
                            />
                            <SelectWithSearch
                                className="select-org"
                                placeholder="All Organizations"
                                list={orgs}
                                value={org}
                                onSelect={val => this.setState({org: val})}
                                displayAs={(org) => org.name}
                                onPick={org => this.setState({org})}
                            />
                        </div>
                        <div className="table-wrap">
                            <DataTable
                                filter={{keyword: kw, orgID: org ? org.id : null}}
                                api={api}
                                columns={columns}
                                className="venue-table"
                                rowLinkTo={venue => "/venue/" + venue.id}
                                pageSize={50}
                            />
                        </div>
                    </div>
                </div>
            </InitTitle>
        );
    }
}
