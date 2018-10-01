import React, {Fragment} from "react";
import {CommonInput} from "../common-input/common-input";
import {parseDate, parseTime} from "../../utils/date-utils";
import {validationUtils} from "../../utils/validation-utils";
import moment from "moment"

export class InputTime extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: parseTime(props.value)
        };
    };
    handleChange = () => {
        console.log(this.state.value)
        let d = validationUtils.isTime(this.state.value);
        console.log(d);
        if(d){
            let [hour, minute] = moment(this.state.value.replace(":","").replace(" ",""), "hhmma").format("HH:mm").split(":");
            this.props.onChange(Object.assign({}, this.props.value, {hour: Number(hour), minute: Number(minute)}));
        }
        else{
            this.setState({
                value: parseTime(this.props.value)
            })
        }

    };

    render(){
        let {value, onChange, ...rest} = this.props;
        return(
            <Fragment>
                <div className="date-input">
                    <div className="input-contain">
                        <CommonInput
                            {...rest}
                            value={this.state.value}
                            onChange={(value) => this.setState({value})}
                            onBlur={this.handleChange}
                            placeholder="hh:mm (am/pm)"

                        />
                    </div>

                    <div className="date-picker-toggle">
                        <i className="far fa-clock"/>
                    </div>
                </div>
            </Fragment>
        );
    }
}
