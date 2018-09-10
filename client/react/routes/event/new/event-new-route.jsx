import React from "react";
import {InitTitle} from "../../../common/init-title/init-title";
import {customHistory} from "../../../main-route";
import {arrUtils} from "../../../utils/arr-utils";
import {PageFormLayout} from "../../../common/page-form-layout/page-form-layout";
import {CommonFormControl} from "../../../common/common-form-control/common-form-control";

import {createFrom} from "../../../utils/form-utils";
import {appModal} from "../../../common/modals/modals";
import {venueApi} from "../../../../api/common/app/venue-api";
import {orgApi} from "../../../../api/common/app/org-api";
import {PromiseSerial} from "../../../utils/common-utils";

export class EventNewRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            venueMaps: []
        };
    };

    save = () => {
        let {info, venueMaps} = this.state;
        let promises = [
            () => venueApi.upsertVenue(info, info.organization.id)
        ];

        promises.push(([_venue]) => {
            const _promises = venueMaps.map((venueMap) =>
                orgApi.upsertVenueMap(
                    info.organization.id,
                    _venue.id,
                    {..._.omit(venueMap, "timestamp"), venue: _venue}
                )
            );

            return Promise.all(_promises);
        });
        PromiseSerial(promises).then(([_venue]) => {
            customHistory.push(`/venue/${_venue.id}`);
        });
    };

    handleDeleteVenueMap = (data, i) => {
        let {venueMaps} = this.state;
        let newVenueMaps = venueMaps;
        newVenueMaps.splice(i, 1);
        this.setState({
            venueMaps: newVenueMaps
        });
    };

    render() {
        let {info, venueMaps} = this.state;
        let {address, timezone, name} = info || {};
        let {address1, city, country, state, zip_code} = address || {};
        let data = {name , address1, city, country, state, zip_code, timezone, venueMaps};
        console.log(this.state);
        let venueForm = createFrom(data);
        let invalidPaths = venueForm.getInvalidPaths(venueValidation(data));
        console.log(invalidPaths)
        return (
            <InitTitle
                title="Groupmatics Management"
            >
                <div className="venue-new-route">
                    <div className="header">
                        <div>
                            <span className="navigate-to-list"
                                  onClick={() => customHistory.push("/venue-list")}
                            >
                                <i className="fas fa-arrow-left"/>
                                &nbsp;
                                Back to Venues
                            </span>
                        </div>
                        <div className="title">
                            New Venue
                        </div>
                    </div>
                    <div className="body">
                        <PageFormLayout
                            renderForm={
                                (
                                    <VenueForm
                                        needOrg={true}
                                        info={info || {}}
                                        invalidPaths={invalidPaths}
                                        maps={venueMaps}
                                        canDelete={false}
                                        onChange={change => {
                                            this.setState({...change})
                                        }}
                                        deleteVenueMap={this.handleDeleteVenueMap}
                                    />
                                )
                            }
                            renderControl={
                                <CommonFormControl
                                    onCancel={() => customHistory.push("/venue-list")}
                                    onSave={() => this.save()}
                                    canSave={invalidPaths.length === 0}
                                />
                            }
                        />
                    </div>
                </div>
            </InitTitle>
        );
    }
}
