
import React, {Fragment} from "react";
import {formatDate, parseDate} from "../../utils/date-utils";
import {DateInput} from "../common-input/date-input/date-input";
import {validationUtils} from "../../utils/validation-utils";

export class InputDate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: parseDate(props.value)
        };
    };

    handleChange = () => {

        let d = validationUtils.isDate(this.state.value);

        if(d){
            let [month, day, year] = this.state.value.split("/");
            this.props.onChange(Object.assign({}, this.props.value, {month: Number(month), day: Number(day), year: Number(year)}));
        }
        else{
            this.setState({
                value: parseDate(this.props.value)
            })
        }

    };

    render(){
        let {value, onChange, ...rest} = this.props;
        return(
            <Fragment>
                <DateInput
                    {...rest}
                    value={this.state.value}
                    onChange={(value) => this.setState({value})}
                    onBlur={this.handleChange}
                />
            </Fragment>
        );
    }
}
