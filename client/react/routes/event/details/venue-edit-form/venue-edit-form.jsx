import React, {Fragment} from "react";
import {orgApi} from "../../../../../api/common/app/org-api";
import {CommonSelect} from "../../../../common/common-select/common-select";

export class VenueEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        orgApi.getVenues(props.requiredData.orgID).then((venues) => {
            this.getMaps(props.venueMap.venue.id).then(maps => {
                this.setState({maps, venues, loading:false})
            })
        })
    };

    getMaps = venueID => {
        return orgApi.getVenueMaps(this.props.requiredData.orgID, venueID)
    };

    changeVenue = venue => {
        this.setState({loading: true});
        let {onChange, venueMap} = this.props;
        this.getMaps(venue.id).then((maps) => {
            const defaultVenueMap = maps.find(map => map.default) || maps[0] || {...venueMap};
            this.setState({loading: false});
            onChange(defaultVenueMap);
        })
    };

    render() {
        let {venues, loading, maps} = this.state;
        let {venueMap, onChange} = this.props;
        return (
            <Fragment>
                {!loading && (
                    <Fragment>
                        <CommonSelect
                            className={`venues event-form-section`}
                            onChange={val => this.changeVenue(val)}
                            list={venues}
                            displayAs={val => {
                                return val.venue.name
                            }}
                            value={venueMap || ""}
                            label="Venue"
                            compare={(target, value) => target.id === value.venue.id}
                        />
                        <CommonSelect
                            className={`maps event-form-section`}
                            onChange={val => onChange(val)}
                            list={maps}
                            displayAs={val => {
                                return val.name
                            }}
                            value={venueMap || ""}
                            label="Venue Map"
                            compare={(target, value) => target.id === value.id}
                        />
                    </Fragment>
                )

                }

            </Fragment>
        );
    }
}
