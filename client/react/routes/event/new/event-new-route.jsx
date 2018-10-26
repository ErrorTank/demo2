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
import {eventApi} from "../../../../api/common/app/event-api";

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
  }, {
    label: "Outings",
    active: false,
    disabled: true
  }];

  save = () => {
    this.setState({loading: true});
    eventApi.upsertEvent(preprocessData(this.state.event)).then((event) => {
      customHistory.push(`/event/${event.id}/details`);
    });
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
                  canSave={true}
                />
              }
            />
          </div>
        </div>
      </InitTitle>
    );
  }
}

export const preprocessData = event => {
  const date_time = event.time_tbd ? {
    ...event.date_time,
    hour: 12,
    minute: 0,
    second: 0,
    timezone: event.timezone
  } : {
    ...event.date_time,
    timezone: event.timezone
  };
  return Object.assign(
    {},
    event,
    {
      date_time,
      disabled: false,
      description: ""
    }
  );
};
