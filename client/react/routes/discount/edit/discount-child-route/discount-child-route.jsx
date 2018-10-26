import React from "react";
import {Switch, Route} from "react-router-dom"
import {DiscountEditDetails} from "../discount-edit-details/discount-edit-details";


export class DiscountChildRoute extends React.Component{
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
                        <DiscountEditDetails
                            {...props}
                        />
                    )
                }
            }, {
                step: "integration",
                render: (props) => (
                    <DiscountEditIntegration
                        {...props}
                    />
                )
            }, {
                step: "deactivations",
                render: (props) => (
                    <DiscountDeactivations
                        {...props}
                    />
                )
            }
        ];
        return(
            <Switch>
                {childs.map(({step, render}, i) => (
                    <Route exact key={i} path={`/discount/:discountID/${step}`} render={secProps => {
                        return render({...this.props, ...secProps})
                    }}/>
                ))}
            </Switch>
        );
    }
}
