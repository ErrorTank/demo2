import React from "react";
import {Logo} from "../../../common/logo/logo";
import {InitTitle} from "../../../common/init-title/init-title";
import {venueApi} from "../../../../api/common/app/venue-api";
import {customHistory} from "../../../main-route";

import {appModal} from "../../../common/modals/modals";
import {PageFormLayout} from "../../../common/page-form-layout/page-form-layout";
import {VenueForm} from "../venue-form/venue-from";
import {CommonFormControl} from "../../../common/common-form-control/common-form-control";
import {FetchVenueInfo} from "./fetch-venue-info/fetch-venue-info";
import {validationUtils} from "../../../utils/validation-utils";
import {createFrom} from "../../../utils/form-utils";
import _ from "lodash"
import {arrUtils} from "../../../utils/arr-utils";


export const venueValidation = info => {
    let {required, zipCodeMatch, notEmpty} = validationUtils;
    return {
        "name": [required],
        "address1": [required],
        "city": [required],
        "country": [required],
        "state": [required],
        "zip_code": [required, zipCodeMatch(info.country)],
        "timezone": [required],
        "venueMaps" : [notEmpty]
    }
};

export class VenueEditRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    };


    render() {

        return (
            <InitTitle title="Groupmatics Management">
                <FetchVenueInfo
                    venueID={this.props.match.params.venueID}

                >
                    {
                        ({info, handleDeleteVenue, onChange, infoDraft, mapsDraft, venueMaps, deleteVenueMap, save}) => {
                            let {name, organization} = infoDraft || {};
                            let {address, timezone, name: changeName} = info || {};
                            let {address1, city, country, state, zip_code} = address;
                            let data = {name: changeName, address1, city, country, state, zip_code, timezone, venueMaps};
                            let venueForm = createFrom(data);
                            let invalidPaths = venueForm.getInvalidPaths(venueValidation(data));
                            return (
                                <div className="venue-edit-route">
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
                                        <div className="logo-wrapper">
                                            <Logo
                                                label={name}
                                                imgSrc={organization.logo_url}
                                            />
                                        </div>
                                    </div>
                                    <div className="body">
                                        <PageFormLayout
                                            renderForm={
                                                <VenueForm
                                                    info={info}
                                                    onChange={onChange}
                                                    onDelete={handleDeleteVenue}
                                                    invalidPaths={invalidPaths}
                                                    maps={venueMaps}
                                                    deleteVenueMap={deleteVenueMap}
                                                    canDelete={true}
                                                />
                                            }
                                            renderControl={
                                                <CommonFormControl
                                                    onCancel={() => customHistory.push("/venue-list")}
                                                    canSave={invalidPaths.length === 0 && (!_.isEqual(info, infoDraft) || !arrUtils.compareObjArr(venueMaps, mapsDraft))}
                                                    onSave={() => save()}
                                                />
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        }
                    }
                </FetchVenueInfo>
            </InitTitle>
        );
    }
}
