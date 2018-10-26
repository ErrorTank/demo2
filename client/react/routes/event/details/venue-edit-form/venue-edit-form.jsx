import React, {Fragment} from "react";
import {orgApi} from "../../../../../api/common/app/org-api";
import {CommonSelect} from "../../../../common/common-select/common-select";
import {VenueMap} from "./venue-map/venue-map";
import {AsyncCache} from "../../../../utils/async-cache";
import {VenueMapPicker} from "./venue-map-picker/venue-map-picker";
import {NewVenueMapForm} from "./new-venue-map-form/new-venue-map-form";

export class VenueEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      venues: []
    };

    orgApi.getVenues(props.requiredData.orgID).then((venues) => {
      this.setState({venues, loading: false})
    });

  };


  render() {
    let {venues, loading} = this.state;
    let {venueMap, onChange, requiredData} = this.props;
    return (
      <Fragment>
        {!loading && (
          <Fragment>
            {venueMap && venueMap.venue && !venueMap.venue.id || venues.length === 0 ? (
              <NewVenueMapForm
                onChange={onChange}
                info={venueMap}
              />
            ) : venues.length && (
              <VenueMapPicker
                venueMap={venueMap}
                venues={venues}
                orgID={requiredData.orgID}
                onChange={onChange}
              />
            )

            }
          </Fragment>

        )

        }

      </Fragment>
    );
  }
}
