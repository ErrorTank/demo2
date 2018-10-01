import React from "react";
import {PageFormLayout} from "../../../common/page-form-layout/page-form-layout";
import {customHistory} from "../../../main-route";
import {CommonFormControl} from "../../../common/common-form-control/common-form-control";
import {CommonInput} from "../../../common/common-input/common-input";
import {InputDate} from "../../../common/input-date/input-date";
import {Radio} from "../../../common/radio/radio";
import {InputTime} from "../../../common/input-time/input-time";
import {CommonSelect} from "../../../common/common-select/common-select";
import {orgApi} from "../../../../api/common/app/org-api";
import {VenueEditForm} from "./venue-edit-form/venue-edit-form";

export class EventEditDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            eventDraft: props.event,
        };
        console.log(props);

    };

    save = () => {

    };

    handleChange = (obj) => {
        this.setState({eventDraft: Object.assign({}, this.state.eventDraft, obj)})
    };



    render(){
        let {loading, eventDraft, venues} = this.state;
        let {title, date_time, time_tbd, description, venue_map} = eventDraft || {};

        return(
           <PageFormLayout
                className="event-edit-details-route"
                renderForm={!loading &&
                (
                    <div className="details-form">
                        <CommonInput
                            className={`event-name event-form-section`}
                            type="text"
                            onChange={title => this.handleChange({title})}
                            value={title || ""}
                            label="Event Name"
                        />
                        <div className="event-date-wrap">
                            <InputDate
                                className={`input-date`}
                                type="text"
                                onChange={date_time => this.handleChange({date_time})}
                                value={date_time || ""}
                                label="Event Date"

                            />
                        </div>
                        <div className="event-time">
                            <div className="title">
                                Event Time
                            </div>
                            <div className="event-time-option">
                                <div className="et-wrap">
                                    <Radio
                                        checked={!time_tbd}
                                        onChange={() => this.handleChange({time_tbd: false})}
                                    />
                                    <span>
                                        <InputTime
                                            type="text"
                                            className={`date-time-input ${time_tbd ? "disabled" : ""}`}
                                            value={date_time}
                                            onChange={val => this.handleChange({date_time: val})}
                                        />
                                    </span>
                                </div>
                                <div className="et-wrap">
                                    <Radio
                                        checked={time_tbd}
                                        onChange={() => this.handleChange({time_tbd: true})}
                                    />
                                    <span>
                                        TBA
                                    </span>
                                </div>

                            </div>
                        </div>
                        <CommonInput
                            className={`description event-form-section`}
                            type="text"
                            onChange={description => this.handleChange({description})}
                            value={description || ""}
                            label="Description"
                            isTextArea
                        />
                        <VenueEditForm
                            venues={venues}
                            venueMap={venue_map}
                            requiredData={{
                                orgID: eventDraft.organization.id
                            }}
                            onChange={(venue_map) => this.handleChange({venue_map})}
                        />

                    </div>
                )}
                renderControl={(
                    <CommonFormControl
                        onCancel={() => customHistory.push("/events")}
                        onSave={() => this.save()}
                        canSave={false}
                    />
                )}
           />
        );
    }
}
