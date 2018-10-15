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
import _ from "lodash"
import {venueApi} from "../../../../api/common/app/venue-api";
import {eventApi} from "../../../../api/common/app/event-api";
import {PromiseSerial} from "../../../utils/common-utils";
import {facebookApi} from "../../../../api/common/app/fb-api";

export class EventEditDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            eventDraft: props.event,
            saving: false
        };
        console.log(props);

    };

    save = () => {
        this.setState({saving: true});
        let {eventDraft} = this.state;
        const {event: oldEvent, eventOverview, onChangeEvent} = this.props;
        let promises = [
            () => {
                const date_time = eventDraft.time_tbd ? {
                    ...eventDraft.date_time,
                    hour: 12,
                    minute: 0,
                    second: 0,
                    timezone: eventDraft.timezone || eventDraft.date_time.timezone
                } : {
                    ...eventDraft.date_time,
                    timezone: eventDraft.timezone || eventDraft.date_time.timezone
                };

                return Promise.resolve(Object.assign(
                    {},
                    eventDraft,
                    { date_time }
                ));
            }
        ];
        if(eventDraft.venue_map){
            if(!eventDraft.venue_map.id){

                promises.push(([event]) => {
                    const {venue_map, organization} = event;
                    return venueApi.upsertVenueMaps(organization.id, venue_map.venue.id, venue_map)
                })
            }
            if(!eventDraft.venue_map.id || eventDraft.venue_map.id !== oldEvent.venue_map.id) {

                promises.push(([event, venueMap = event.venue_map]) =>
                {
                    console.log(event)
                    console.log(venueMap)
                    return eventApi.updateVenueMapToExistingEvent(event.id, venueMap.id)
                }
                );
            }
        }
        promises.push(([event, venue_map = event.venue_map]) => eventApi.upsertEvent({
            ...event,
            venue_map,
            ticketing_provider_config: oldEvent.ticketing_provider_config
        }));
        PromiseSerial(promises).then((cols) => {
            const updatedEvent = cols.pop();

            if(eventOverview.has_facebook_event && (!_.isEqual(oldEvent.title, updatedEvent.title) || !_.isEqual(oldEvent.venue_map.venue.id, updatedEvent.venue_map.venue.id))) {
                let updatedVenue = !_.isEqual(oldEvent.venue_map.venue.id, updatedEvent.venue_map.venue.id);
                facebookApi.updateEventOnFb(null, eventDraft.id, updatedVenue);
            }

            this.setState({saving: false});
            onChangeEvent(updatedEvent);
        });
    };

    handleChange = (obj) => {
        this.setState({eventDraft: Object.assign({}, this.state.eventDraft, obj)})
    };



    render(){
        let {loading, eventDraft, venues, saving} = this.state;
        let {title, date_time, time_tbd, description, venue_map} = eventDraft || {};
        let disabled = saving || _.isEqual(eventDraft, this.props.event)
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
                        canSave={!disabled}
                    />
                )}
           />
        );
    }
}
