import React from "react";
import {CommonInput} from "../../../common/common-input/common-input";

export class IntegrationForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };

    allProviderProps = {
        1: [{
            label: 'Event ID',
            type: 'number',
            prop: 'event_id'
        }],
        2: [{
            label: 'Event Name',
            type: 'text',
            prop: 'event_name'
        }],
        3: [{
            label: 'Event Name',
            type: 'text',
            prop: 'event_name'
        }],
        4: [{
            label: 'Event ID',
            type: 'number',
            prop: 'event_id'
        }],
        5: [{
            label: 'Season Code',
            type: 'text',
            prop: 'season_code'
        }, {
            label: 'Event Code',
            type: 'text',
            prop: 'event_code'
        }],
        6: [{
            label: 'Event ID',
            type: 'number',
            prop: 'event_id'
        }],
        7: [{
            label: 'Event ID',
            type: 'text',
            prop: 'event_id'
        }],
    };

    render(){
        let {event, canEdit, providerConfig, onChangeEdit, onChange} = this.props;
        let type = providerConfig.ticketing_provider;
        let list = this.allProviderProps[type];
        console.log(providerConfig)
        return(
            <div className="integration-form">
                {list.map((prop, i) => (
                    <div className="input-wrap"
                         key={i}
                    >
                        <CommonInput
                            key={i}
                            label={prop.label}
                            type={prop.type}
                            disabled={event.ticketing_provider_config && !canEdit}
                            value={providerConfig[prop.prop]}
                            onChange={onChange(prop)}
                        />
                        <i className={`lock-icon fas fa-${canEdit ? "lock-open" : "lock"}`}
                           onClick={() => onChangeEdit(!canEdit)}
                        />
                    </div>

                ))}
            </div>
        );
    }
}
