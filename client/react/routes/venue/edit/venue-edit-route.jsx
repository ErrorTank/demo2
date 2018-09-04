import React from "react";
import {Logo} from "../../../common/logo/logo";
import {InitTitle} from "../../../common/init-title/init-title";
import {venueApi} from "../../../../api/common/app/venue-api";
import {customHistory} from "../../../main-route";

import {appModal} from "../../../common/modals/modals";
import {PageFormLayout} from "../../../common/page-form-layout/page-form-layout";
import {VenueForm} from "../venue-form/venue-from";
import {CommonFormControl} from "../../../common/common-form-control/common-form-control";
import {validationUtils} from "../../../utils/validation-utils";
import {createFrom} from "../../../utils/form-utils";
import _ from "lodash"
import {arrUtils} from "../../../utils/arr-utils";
import {orgApi} from "../../../../api/common/app/org-api";
import {PromiseSerial} from "../../../utils/common-utils";


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
        "venueMaps": [notEmpty]
    }
};

export class VenueEditRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        let venueID = props.match.params.venueID;
        venueApi.getVenueInfo(venueID).then(info => {
            let {id: orgID} = info.organization;
            orgApi.getVenueMap(orgID, venueID).then(venueMaps => this.setState({
                venueMaps,
                mapsDraft: venueMaps,
                info,
                loading: false,
                infoDraft: info
            }))
        })

    };

    handleDeleteVenueMap = (data, i) => {
        let promises = Promise.resolve(true);
        let {venueMaps} = this.state;
        if (data.id) {
            promises = promises.then(() => venueApi.canDeleteVenueMap(data.id))
        }
        promises.then(result => {
            if (!result) {
                return appModal.alert({
                    title: "You may not delete this venue map.",
                    text: "There are events using this venue map. Please remove this venue from all events to delete the venue map.",
                    btnText: "OK"
                })
            } else {
                appModal.confirm({
                    title: "Delete Venue Map",
                    text: "Are you sure you want to delete this venue map?",
                    btnText: "Confirm",
                    cancelText: "Cancel"
                }).then(status => {
                    if (status) {
                        const {info} = this.state;
                        if (data.id) {
                            return orgApi.deleteVenueMap(info.organization.id, info.id, data.id).then((newVenueMaps) => {
                                this.setState({
                                    mapsDraft: newVenueMaps,
                                    venueMaps: newVenueMaps
                                });
                            });
                        } else {
                            let newVenueMaps = venueMaps;
                            newVenueMaps.splice(i, 1);
                            this.setState({
                                venueMaps: newVenueMaps
                            });
                        }
                    }
                })
            }
        })
    };

    handleDeleteVenue = (info) => {

        let {id: venueID, organization} = info;
        let {id: orgID} = organization;
        venueApi.canDelete(venueID).then(result => {
            if (!result) {
                return appModal.alert({
                    title: "You may not delete this venue.",
                    text: "There are events using this venue. Please remove this venue from all events to delete the venue.",
                    btnText: "OK"
                })
            } else {
                appModal.confirm({
                    title: "Delete Venue",
                    text: "Are you sure you want to delete this venue?",
                    btnText: "Confirm",
                    cancelText: "Cancel"
                }).then(status => {
                    if (status) {
                        venueApi.deleteVenue(venueID, orgID).then(() => customHistory.push("/venue-list"))
                    }
                })
            }
        })
    };

    save = () => {
        const {info, infoDraft, mapsDraft, venueMaps} = this.state;
        const getOldVenueMap = (id) => mapsDraft.find(vM => vM.id === id);
        const upsertVenueMapFn = (orgId, info, venueMap) => {
            if (venueMap.timestamp || !_.isEqual(venueMap, getOldVenueMap(venueMap.id)))
                return orgApi.upsertVenueMap(
                    orgId,
                    info.id,
                    {..._.omit(venueMap, "timestamp"), venue: info}
                );
            else
                return Promise.resolve(venueMap);
        };
        let promises = [];
        console.log(info)
        console.log(infoDraft)
        if (!_.isEqual(info, infoDraft)) {
            promises.push(() => venueApi.upsertVenue(info, infoDraft.organization.id));
        } else {
            promises.push(() => Promise.resolve(infoDraft));
        }
        let defaultVenueMap = null;

        const notDefaultMaps = venueMaps.filter((venueMap) => {
            if (venueMap.default) defaultVenueMap = venueMap;
            return !venueMap.default;
        });

        if (defaultVenueMap) {
            promises.push(([_venue]) =>
                upsertVenueMapFn(infoDraft.organization.id, _venue, defaultVenueMap)
            );
        }

        promises.push(([_venue]) => Promise.all(notDefaultMaps.map((venueMap) =>
            upsertVenueMapFn(infoDraft.organization.id, _venue, venueMap))
        ));
        promises.push(() => this.getVenueMaps(infoDraft.organization.id, infoDraft.id));

        PromiseSerial(promises)
            .then(() => {
                this.setState({
                    infoDraft: info,
                    loading: false,
                });
            })
            .then(() => {
                const oldDefaultVenueMap = venueMaps.find(vM => vM.default);
                if (defaultVenueMap && (defaultVenueMap.timestamp || !oldDefaultVenueMap || !_.isEqual(oldDefaultVenueMap.id, defaultVenueMap.id))) {
                    this.updateVenueAllEvents();
                }
            });
    };

    updateVenueAllEvents = () => {
        const {infoDraft, mapsDraft} = this.state;
        const defaultVenueMap = mapsDraft.find(vM => vM.default);
        appModal.confirm({
            text: "Do you want to update the seat map of all active outings using this venue?",
            title: "Bulk Update",
            buttonText: "Yes, update",
            cancelText: "No, only future outings"
        })
            .then((confirm) => {
                if (confirm) {
                    orgApi.bulkUpdateVenueAllEvents(infoDraft, defaultVenueMap.id);
                }
            });
    };

    getVenueMaps(orgId, venueId) {
        return orgApi.getVenueMaps(orgId, venueId).then((venueMaps) => {
                console.log(venueMaps)
                this.setState(
                    {venueMaps, mapsDraft: venueMaps})
            }
        );
    }

    render() {
        let {info, loading, infoDraft, mapsDraft, venueMaps} = this.state;
        let {name, organization} = infoDraft || {};
        let {address, timezone, name: changeName} = info || {};
        let {address1, city, country, state, zip_code} = address || {};
        let data = {
            name: changeName,
            address1,
            city,
            country,
            state,
            zip_code,
            timezone,
            venueMaps
        };
        let venueForm = createFrom(data);
        let invalidPaths = venueForm.getInvalidPaths(venueValidation(data));
        let onChange = change => {
            this.setState({...change})
        };
        return (
            <InitTitle title="Groupmatics Management">
                {!loading && (
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
                                        onDelete={this.handleDeleteVenue}
                                        invalidPaths={invalidPaths}
                                        maps={venueMaps}
                                        deleteVenueMap={this.handleDeleteVenueMap}
                                        canDelete={true}
                                    />
                                }
                                renderControl={
                                    <CommonFormControl
                                        onCancel={() => customHistory.push("/venue-list")}
                                        canSave={invalidPaths.length === 0 && (!_.isEqual(info, infoDraft) || !arrUtils.compareObjArr(venueMaps, mapsDraft))}
                                        onSave={() => this.save()}
                                    />
                                }
                            />
                        </div>
                    </div>
                )

                }


            </InitTitle>
        );
    }
}
