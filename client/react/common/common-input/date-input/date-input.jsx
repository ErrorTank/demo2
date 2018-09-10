import React from "react";
import {CommonInput} from "../common-input";

export class DateInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showDatePicker: false
        };
    };
    render(){
        return(
            <div className="date-input">
                <CommonInput
                    {...this.props}
                />
                <div className="date-picker-toggle">
                    <i className="fas fa-calendar-alt"/>
                </div>
            </div>

        );
    }
}
