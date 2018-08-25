import React from "react";

export class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {label, value} = this.props;
        return(
            <div className={`toggle`}>
                <div className={`toggle-btn ${value === "on" ? "on" : "off"}`}>
                    <div className="dot">

                    </div>
                </div>
                <div className="toggle-label">
                    {value === "on" ? label.on : label.off}
                </div>
            </div>
        );
    }
}
