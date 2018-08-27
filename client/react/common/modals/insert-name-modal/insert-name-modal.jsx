import React from "react";

export class InsertNameModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: ""
        };
    };
    render(){
        let {onConfirm, onDismiss} = this.props;
        let {name} = this.state;
        return(
            <div className="insert-name-modal">
                <div className="modal-header">
                    <div className="modal-title">
                        Venue Map Name
                    </div>
                    <i className="fas fa-times close-modal"
                       onClick={() => onDismiss()}
                    />
                </div>
                <div className="modal-body">
                    <input type="text"
                           className="venue-name"
                           value={name}
                           onChange={(e) => this.setState({name: e.target.value})}
                    />
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
                        Save
                    </button>
                </div>
            </div>
        );
    }
}
