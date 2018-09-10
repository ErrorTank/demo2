import React from "react";
import {DateInput} from "../../common-input/date-input/date-input";

export class DatePickerModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            from: null,
            to: null
        };
    };
    render(){
        let {onConfirm, onDismiss} = this.props;
        let {from, to} = this.state;
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
                    <DateInput
                        className={`dp-input`}
                        type="text"
                        onChange={from => this.setState({from})}
                        value={from || ""}
                        label="From"

                    />
                    <DateInput/>
                </div>
                <div className="modal-footer">
                    <button className="btn modal-btn confirm-btn"
                            onClick={() => onDismiss()}
                    >
                        Cancel
                    </button>
                    <button className="btn modal-btn cancel-btn"
                            onClick={() => onConfirm(name)}
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }
}
