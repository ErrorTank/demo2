import React, {Fragment} from "react";
import {venueApi} from "../../../../../api/common/app/venue-api";
import {appModal} from "../../../../common/modals/modals";
import {customHistory} from "../../../../main-route";
import {orgApi} from "../../../../../api/common/app/org-api";

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

    handleDeleteVenueMap = data => {

        venueApi.canDeleteVenueMap(data.id).then(result => {
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
                        deleteVenueMap: this.handleDeleteVenueMap
                    })
                }
            </Fragment>
        );
    }
}
