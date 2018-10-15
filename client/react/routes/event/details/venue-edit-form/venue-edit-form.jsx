import React, {Fragment} from "react";
import {orgApi} from "../../../../../api/common/app/org-api";
import {CommonSelect} from "../../../../common/common-select/common-select";
import {VenueMap} from "./venue-map/venue-map";
import {AsyncCache} from "../../../../utils/async-cache";

export class VenueEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.mapsCache = AsyncCache.createAsyncCache(venueID => this.getMaps(venueID));
        orgApi.getVenues(props.requiredData.orgID).then((venues) => {
            if(props.venueMap){
                let defaultVenue = venues.find(v => v.default) || venues[0];
                this.mapsCache.retrieve(defaultVenue.id).then((maps) => {
                    const defaultVenueMap = maps.find(map => map.default) || maps[0] || { venue: defaultVenue };
                    props.onChange(defaultVenueMap)
                });
            }else{
                this.mapsCache.retrieve(props.venueMap.venue.id).then(maps => {
                    this.setState({maps, venues, loading:false})
                });
            }


        });

    };



    getMaps = venueID => {
        return orgApi.getVenueMaps(this.props.requiredData.orgID, venueID)
    };

    changeVenue = venue => {
        this.setState({loading: true});
        let {onChange, venueMap} = this.props;
        this.mapsCache.retrieve(venue.id).then((maps) => {
            const defaultVenueMap = maps.find(map => map.default) || maps[0] || {...venueMap};
            this.setState({loading: false, maps});
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
                                console.log(val);
                                return val.name
                            }}
                            value={venueMap || ""}
                            label="Venue"
                            displaySelected={val => val.venue.name}
                            compare={(target, value)    =>{

                                return target.id === value.venue}
                            }
                        />

                        <VenueMap
                            maps={maps}
                            onChange={val => {

                                onChange(val)
                            }}
                            onAddMap={val => {
                                this.setState({maps: maps.concat(val)});
                                this.mapsCache.changeExisted(val.venue.id, maps.concat(val));
                                onChange(val)
                            }}
                            venueMap={venueMap}
                            venue={venueMap.venue}
                        />

                    </Fragment>
                )

                }

            </Fragment>
        );
    }
}
