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
import {InpageNav} from "../../../common/inpage-nav/inpage-nav";
import {EventNewDetail} from "./details/event-new-detail";

export class EventNewRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {
                time_tbd: false
            }
        };
    };

    navLinks = [{
        label: "Details",
        active: true
    },{
        label: "Outings",
        active: false,
        disabled: true
    }];

    save = () => {

    };


    render() {
        let {event} = this.state;

        return (
            <InitTitle
                title="Groupmatics Management"
            >
                <div className="event-new-route">
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
                        <div className="title">
                            New Event
                        </div>
                    </div>
                    <InpageNav
                        links={this.navLinks}
                    />
                    <div className="body">
                        <PageFormLayout
                            className="event-new"
                            renderForm={
                                (
                                    <EventNewDetail
                                        event={event}
                                        onChange={event => this.setState({event})}
                                    />
                                )
                            }
                            renderControl={
                                <CommonFormControl
                                    onCancel={() => customHistory.push("/venue-list")}
                                    onSave={() => this.save()}
                                    canSave={false}
                                />
                            }
                        />
                    </div>
                </div>
            </InitTitle>
        );
    }
}
