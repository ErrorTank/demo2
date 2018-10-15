import React from "react";
import {ticketUtils} from "../../../utils/ticket-utils";
import {PageFormLayout} from "../../../common/page-form-layout/page-form-layout";
import {customHistory} from "../../../main-route";
import {IntegrationForm} from "./integration-form";
import {CommonFormControl} from "../../../common/common-form-control/common-form-control";
import _ from "lodash"
import {eventApi} from "../../../../api/common/app/event-api";

export class Integration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            providerConfig: null,
            canEdit: false
        };

    }

    componentDidMount(){
        this.initData(this.props.event);
    }

    initData(event) {
        const {ticketing_provider_config, organization} = event;
        const orgTicketingProvider = ticketUtils.getProvider({organization});


        if (ticketing_provider_config && ticketing_provider_config.ticketing_provider == orgTicketingProvider) {
            console.log("dsa2")
            this.setState({providerConfig: event.ticketing_provider_config});
        } else {
            const providerConfig = {ticketing_provider: orgTicketingProvider};
            console.log("dasdas")
            this.setState({providerConfig});
        }
    }



    save = () => {
        const eventUpdated = Object.assign({}, this.props.event, {ticketing_provider_config: this.state.providerConfig});
        eventApi.upsertEvent(eventUpdated).then(() => {
            this.props.onChangeEvent(eventUpdated);
        })
    };

    updateConfig = (propConfig) => (val) => {
        const value = propConfig.type === "number" ? parseInt(val) : val;
        this.setState({providerConfig: Object.assign({}, this.state.providerConfig, {[propConfig.prop]: value})})
    };

    render(){
        const {event} = this.props;
        const {providerConfig, canEdit} = this.state;

        return(
            <div className="event-integration">
                {(event && providerConfig) && (
                    <PageFormLayout
                        className="integration-route"
                        renderForm={
                            <IntegrationForm
                                event={event}
                                canEdit={canEdit}
                                providerConfig={providerConfig}
                                onChange={this.updateConfig}
                                onChangeEdit={(val) => this.setState({canEdit: val})}
                            />
                        }
                        renderControl={
                            <CommonFormControl
                                onCancel={() => customHistory.push("/events")}
                                canSave={!_.isEqual(event.ticketing_provider_config, providerConfig)}
                                onSave={() => this.save()}
                            />
                        }
                    />
                )

                }
            </div>
        );
    }
}
