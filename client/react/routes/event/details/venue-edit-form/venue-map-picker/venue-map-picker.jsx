import React, {Fragment} from "react";
import {CommonSelect} from "../../../../../common/common-select/common-select";
import {VenueMap} from "../venue-map/venue-map";
import {AsyncCache} from "../../../../../utils/async-cache";
import {orgApi} from "../../../../../../api/common/app/org-api";

export class VenueMapPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.mapsCache = AsyncCache.createAsyncCache(venueID => this.getMaps(venueID));

    if (!props.venueMap) {
      let {venues, onChange} = props;
      let defaultVenue = venues.find(v => v.default) || venues[0];
      this.mapsCache.retrieve(defaultVenue.id).then((maps) => {
        const defaultVenueMap = maps.find(map => map.default) || maps[0] || {venue: defaultVenue};
        onChange(defaultVenueMap);
        this.setState({loading: false, maps})
      });

    } else {
      this.mapsCache.retrieve(props.venueMap.venue.id).then(maps => {
        console.log(maps)
        this.setState({maps, loading: false})
      });
    }
  };

  getMaps = venueID => {
    return orgApi.getVenueMaps(this.props.orgID, venueID)
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
    let {venues, venueMap, onChange} = this.props;
    let {maps, loading} = this.state;

    return (
      <Fragment>
        {!loading && (
          <Fragment>
            <CommonSelect
              className={`venues event-form-section`}
              onChange={val => this.changeVenue(val)}
              list={venues}
              displayAs={val => {
                return val.name
              }}
              value={venueMap || ""}
              label="Venue"
              displaySelected={val => val.venue.name}
              compare={(target, value) => {

                return target.id === value.venue
              }
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
