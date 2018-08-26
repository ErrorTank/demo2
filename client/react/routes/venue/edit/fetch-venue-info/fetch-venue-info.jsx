import React, {Fragment} from "react";
import {venueApi} from "../../../../../api/common/app/venue-api";
import {appModal} from "../../../../common/modals/modals";
import {customHistory} from "../../../../main-route";
import {orgApi} from "../../../../../api/common/app/org-api";
import _ from "lodash";
import {PromiseSerial} from "../../../../utils/common-utils";

export class FetchVenueInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading: true
        };
        venueApi.getVenueInfo(props.venueID).then(info => {
            let {id: orgID} = info.organization;
            orgApi.getVenueMap(orgID, props.venueID).then(venueMaps => this.setState({venueMaps, mapsDraft: venueMaps, info, loading: false, infoDraft: info}))
        })
    };

    handleDeleteVenueMap = (data, i) => {
        let promises = Promise.resolve(true);
        let {venueMaps} = this.state;
        if(data.id) {
            promises = promises.then(() => venueApi.canDeleteVenueMap(data.id))
        }
        promises.then(result => {
            if(!result){
                return appModal.alert({
                    title: "You may not delete this venue map.",
                    text: "There are events using this venue map. Please remove this venue from all events to delete the venue map.",
                    btnText: "OK"
                })
            }else {
                appModal.confirm({
                    title: "Delete Venue Map",
                    text: "Are you sure you want to delete this venue map?",
                    btnText: "Confirm",
                    cancelText: "Cancel"
                }).then(status => {
                    if (status) {
                        const {info} = this.state;
                        if(data.id) {
                            return orgApi.deleteVenueMap(info.organization.id, info.id, data.id).then((newVenueMaps) => {
                                this.setState({
                                    mapsDraft: newVenueMaps,
                                    venueMaps: newVenueMaps
                                });
                            });
                        }else{
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

        const notDefaultMaps = venueMaps.filter((venueMap) =>{
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

    render(){
        let {children} = this.props;
        let {info, loading, infoDraft, mapsDraft, venueMaps} = this.state;
        return(
            <Fragment>
                {!loading &&
                    children({
                        info,
                        handleDeleteVenue: this.handleDeleteVenue,
                        onChange: change => {
                            this.setState({...change})
                        },
                        infoDraft,
                        mapsDraft,
                        venueMaps,
                        deleteVenueMap: this.handleDeleteVenueMap,
                        save: this.save
                    })
                }
            </Fragment>
        );
    }
}
