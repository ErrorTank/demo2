import React from "react";
import {Switch, Route} from "react-router-dom"
import {EventEditDetails} from "../details/event-edit-details";
import {EventEditOutings} from "../outings/event-edit-outings";
import {EventBuyerReport} from "../buyer-report/event-buyer-report";
import {ContactBuyers} from "../contact-buyers/contact-buyers";
import {Integration} from "../integration/intergration";

export class EventChildRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){

        let childs = [
            {
                step: "details",
                render: (props) => {
                    return (
                        <EventEditDetails
                            {...props}
                        />
                    )
                }
            }, {
                step: "outings",
                render: (props) => (
                    <EventEditOutings
                        {...props}
                    />
                )
            }, {
                step: "buyer-report",
                render: (props) => (
                    <EventBuyerReport
                        {...props}
                    />
                )
            }, {
                step: "contact-ticket-buyers",
                render: (props) => (
                    <ContactBuyers
                        {...props}
                    />
                )
            }, {
                step: "integration",
                render: (props) => (
                    <Integration
                        {...props}
                    />
                )
            },
        ];
        return(
            <Switch>
                {childs.map(({step, render}, i) => (
                    <Route exact key={i} path={`/event/:eventID/${step}`} render={secProps => {
                        return render({...this.props, ...secProps})
                    }}/>
                ))}
            </Switch>
        );
    }
}
