import React from "react";

export class CommonFormControl extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {onCancel, canSave, onSave, disabled} = this.props;
        return(
            <div className="common-form-control">
                <button className="cancel"
                        onClick={onCancel}
                >
                    Cancel
                </button>
                <button className={`save ${!canSave ? "btn-disabled" : ""}`}
                        onClick={onSave}
                >
                    Save
                </button>
            </div>
        );
    }
}
