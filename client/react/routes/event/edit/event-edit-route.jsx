import React, {Fragment} from "react";
import {InitTitle} from "../../../common/init-title/init-title";
import {eventApi} from "../../../../api/common/app/event-api";
import {customHistory} from "../../../main-route";
import {EventStatusBar} from "../event-status-bar/event-status-bar";
import {EventChildRoute} from "../event-child-route/event-child-route";
import {EventEditDetails} from "../details/event-edit-details";
import {ImageNav} from "../../../common/image-nav/image-nav";

export class EventEditRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading: true
        };
        let eventID = props.match.params.eventID;
        this.getEventInfo(eventID)

    };


    getEventInfo =eventID => {
        this.setState({event: null, eventOverview: null, loading: true});
        return Promise.all([
            eventApi.getEvent(eventID),
            eventApi.getEventOverview(eventID)
        ]).then(([event, eventOverview]) => this.setState({event, eventOverview, loading: false}))
    };



    render(){
        let {loading} = this.state;
        const {event, eventOverview} = this.state;
        const {eventID} = this.props.match.params;

        const org = event && event.organization || null;
        const navLinks = [{
            to: `/a/event/${eventID}/details`,
            label: "Details",
        }, {
            to: `/a/event/${eventID}/outings`,
            label: "Outings",
        }, {
            to: `/a/event/${eventID}/buyer-report`,
            label: "Buyer Report",
        }, {
            to: `/a/event/${eventID}/integration`,
            label: "Integration",
            condition: () => org != null && org.ticketing_provider_config && org.ticketing_provider_config.ticketing_provider > 0,
        }];
        return(
            <InitTitle
                title="Groupmatics Management"
            >
                {!loading && (
                    <Fragment>
                        <div className="event-edit-route">
                            <div className="header">
                                <div>
                                            <span className="navigate-to-list"
                                                  onClick={() => customHistory.push("/events")}
                                            >
                                                <i className="fas fa-arrow-left"/>
                                                &nbsp;
                                                Back to Events
                                            </span>
                                </div>
                                <EventStatusBar
                                    eventOverview={eventOverview}
                                    eventID={eventID}
                                    reloadEvent={() => this.getEventInfo(eventID)}
                                />
                                <ImageNav links={navLinks.filter((link) => link.condition == null || link.condition())}/>
                            </div>
                            <EventChildRoute
                                event={event}
                                eventOverview={eventOverview}
                                eventID={eventID}
                                onChangeEvent = {(event) => this.setState({event})}
                            />
                        </div>

                    </Fragment>

                )

                }
            </InitTitle>
        );
    }
}

