import React from "react";
import {Logo} from "../../../common/logo/logo";
import {formatDate, formatWithTz} from "../../../utils/date-utils";
import {mapAbbr} from "../../../common/timezone";
import {customHistory} from "../../../main-route";
import {orderApi} from "../../../../api/common/app/order-api";
import {CommonSelect} from "../../../common/common-select/common-select";
import {eventApi} from "../../../../api/common/app/event-api";
import {appModal, modals} from "../../../common/modals/modals";

export class EventStatusBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    reOpenEvent(eventId) {
        const confirm = () => {
            eventApi.disableEnableEvent(eventId, false)
                .then(() => this.props.reloadEvent());

        };

        appModal.confirm({
            text: "Are sure you want to re-open this event?",
            title: "Re-open this event",
            btnText: "Re-open Event",
            cancelText: "Cancel"
        }).then(res => res ? confirm() : Promise.reject());
    }

    render() {
        let {eventOverview, eventID} = this.props;
        const listActions = [{
            label: "Contact ticket buyers",
            condition: () => true,
            action: () => {
                customHistory.push(`/event/${eventID}/contact-ticket-buyers`);
            }
        }, {
            label: "Disable Event",
            condition: () => eventOverview && !eventOverview.disabled,
            action: () => {
                const confirm = () => {
                    eventApi.disableEnableEvent(eventID, true)
                        .then(() => this.props.reloadEvent());
                    modal.close();
                };
                const modal = modals.openModal({
                    content: (
                        <ModalDisableEvent
                            onConfirm={confirm}
                            onDismiss={() => modal.close()}
                        />
                    )
                });
            }
        }, {
            label: "Reopen Event",
            condition: () => eventOverview && eventOverview.disabled,
            action: () => this.reOpenEvent(eventID)
        }, {
            label: "Delete Event",
            condition: () => eventOverview,
            action: () => {
                if (eventOverview.outing_count === 0) {
                    appModal.confirm({
                        title: "Delete Event?",
                        text: "Are you sure you want to delete this event? This action cannot be undone!",
                        btnText: "Delete",
                        cancelText: "Cancel"
                    })
                        .then((confirm) => confirm ? eventApi.deleteEvent(eventID) : Promise.reject())
                        .then(() => customHistory.push("/events"));
                } else {
                    appModal.alert({
                        title: "You may not delete this event.",
                        text: `In order to delete this event, you must first delete all outings attending this event. 
                               To find these outings select the "Outings" tab on this event's page.`,
                        btnText: "Confirm"
                    });
                }
            }
        }];
        return eventOverview ? (

            <div className="status-bar">
                <div className="status-bar-panel has-border info">
                    <Logo
                        label={eventOverview.title}
                        imgSrc={eventOverview.organization.logo_image}
                    />
                    <div className='event-info'>
                        <div className="line">
                            <span>{formatDate(Object.assign({}, eventOverview.date_time, {month: eventOverview.date_time.month - 1}), "MMM DD, YYYY")} </span>|<span> {eventOverview.time_tbd ? "TBA" : formatWithTz(eventOverview.date_time)}</span>
                        </div>
                        <div className="line">
                            <span>{eventOverview.venue.name}</span>
                        </div>
                    </div>
                </div>
                <div className="status-bar-panel has-border">
                    <div className="title">
                        OUTINGS
                    </div>
                    <div className="value">
                        {eventOverview.outing_count}
                    </div>
                </div>
                <div className="status-bar-panel has-border">
                    <div className="title">
                        TOTAL TICKETS
                    </div>
                    <div className="value">
                        {eventOverview.ticket_count}
                    </div>
                </div>
                <div className="status-bar-panel has-border">
                    <div className="title">
                        TOTAL TICKETS SOLD
                    </div>
                    <div className="value">
                        {eventOverview.tickets_sold}
                    </div>
                </div>
                <div className="status-bar-panel actions">
                    <button className="btn btn-primary btn-block download-report-btn"
                            onClick={() => orderApi.getReportEvent(eventID)}
                    >
                        Download Buyer Report
                    </button>
                    <CommonSelect
                        className="action-select"
                        list={listActions.filter(each => !!each.condition())}
                        placeholder="Actions"
                        displayAs={item => item.label}
                        onChange={item => item.action()}
                    />
                </div>
            </div>
        ) : (
            <h1>Loading...</h1>
        );
    }
}

const ModalDisableEvent = ({onConfirm, onDismiss}) => {
    return (
        <div className="modal-disable-outing">
            <div className="modal-header">
                <div className="modal-title">
                    Disable this event
                </div>
            </div>

            <div className="modal-body">

                Disabling this will disable all outings for the event.
                This will remove the outing pages so users will no longer purchase tickets or see the outing
                information.
                Please be sure to contact all ticket purchasers if their orders will be effected.
                To ensure your reports are accurate please be sure to adjust tickets on this outings

            </div>

            <div className="modal-footer">
                <button className="btn modal-btn cancel-btn" onClick={() => onDismiss()}>Cancel</button>

                <button className="btn modal-btn confirm-btn"
                        onClick={() => onConfirm()}
                >Disable Event
                </button>
            </div>
        </div>
    );
};
