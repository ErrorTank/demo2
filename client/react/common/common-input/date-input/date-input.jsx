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
                <div className="input-contain">
                    <CommonInput
                        {...this.props}
                        placeholder="mm/dd/yyyy"

                    />
                </div>

                <div className="date-picker-toggle">
                    <i className="fas fa-calendar-alt"/>
                </div>
            </div>

        );
    }
}
