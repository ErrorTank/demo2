
import React from "react";

export class Radio extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {checked, onChange} = this.props;
        return(
            <div className={`radio ${checked ? "isChecked" : ""}`}
                 onClick={() => !checked && onChange()}
            >
                {checked && (
                    <i className="fas fa-check"/>
                )}
            </div>
        );
    }
}
