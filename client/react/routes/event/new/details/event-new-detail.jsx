import React from "react";
import {OrgSelector} from "./org-selector/org-selector";
import {orgApi} from "../../../../../api/common/app/org-api";
import {CommonInput} from "../../../../common/common-input/common-input";
import {InputDate} from "../../../../common/input-date/input-date";
import {Radio} from "../../../../common/radio/radio";
import {InputTime} from "../../../../common/input-time/input-time";
import {timezones} from "../../../../common/timezone";
import {CommonSelect} from "../../../../common/common-select/common-select";
import {VenueEditForm} from "../../details/venue-edit-form/venue-edit-form";

export class EventNewDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };

    };

    handleChange = (obj) => {
        this.props.onChange(Object.assign({}, this.props.event, obj))
    };

    render(){
        let {event, onChange} = this.props;

        let {title, date_time, time_tbd, venue_map, timezone} = event || {};
        console.log(event)
        return(
            <div className="event-new-detail">
                <OrgSelector
                    value={event.organization}
                    onChange={org => onChange({...event, organization:org, league: org ? org.league : null, timezone: org ? org.timezone_default : null})}
                />
                {event.organization && (
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
                            <CommonSelect
                                disabled={true}
                                className={`time-zone event-form-section`}
                                onChange={val => this.handleChange({timezone: val})}
                                list={timezones.map(i => i.value)}
                                displayAs={val => {
                                    return timezones.find(each => each.value === val).text
                                }}
                                value={timezone || ""}
                                label="Timezone"
                                compare={(target, value) => {
                                    return target === value
                                }}
                                placeholder="Timezone"
                            />
                            <VenueEditForm
                                venueMap={venue_map}
                                requiredData={{
                                    orgID: event.organization.id
                                }}
                                onChange={(venue_map) => this.handleChange({venue_map})}
                            />
                        </div>
                    </div>
                )

                }
            </div>
        );
    }
}
