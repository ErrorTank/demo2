import React from "react";
import {DateInput} from "../../common-input/date-input/date-input";
import {validationUtils} from "../../../utils/validation-utils";
import {createFrom} from "../../../utils/form-utils";
import {formatDate, getTimestamp} from "../../../utils/date-utils";



export const dateValidation = () => {
    let {isDate} = validationUtils;
    return {
        "from": [isDate],
        "to": [isDate],
    }
};
export class DatePickerModal extends React.Component{
    constructor(props){
        super(props);
        console.log(props.value)
        this.state= props.value ? {
            from: formatDate(props.value.from, "MM/DD/YYYY"),
            to: formatDate(props.value.to, "MM/DD/YYYY")
        } : {
            from: null,
            to: null
        }
    };
    render(){
        let {onConfirm, onDismiss} = this.props;
        let {from, to} = this.state;
        let dateForm = createFrom(this.state);
        let invalidPaths = dateForm.getInvalidPaths(dateValidation());
        let isValidDate = getTimestamp(to) - getTimestamp(from) >= 0;
        return(
            <div className="date-picker-modal">
                <div className="modal-header">
                    <div className="modal-title">
                        Date Range
                    </div>
                    <i className="fas fa-times close-modal"
                       onClick={() => onDismiss(null)}
                    />
                </div>
                <div className="modal-body">
                    <div className="dpi-wrap">
                        <DateInput
                            className={`dp-input`}
                            type="text"
                            onChange={from => this.setState({from})}
                            value={from || ""}
                            label="From"

                        />
                    </div>
                    <div className="dpi-wrap">
                        <DateInput
                            className={`dp-input`}
                            type="text"
                            onChange={to => this.setState({to})}
                            value={to || ""}
                            label="To"

                        />
                    </div>

                </div>
                <div className="modal-footer">

                    <button className="btn modal-btn confirm-btn"
                            onClick={() => onConfirm({
                                from: getTimestamp(from),
                                to: getTimestamp(to)
                            })}
                            disabled={invalidPaths.length || !isValidDate}
                    >
                        OK
                    </button>
                    <button className="btn modal-btn cancel-btn"
                            onClick={() => onDismiss()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}
