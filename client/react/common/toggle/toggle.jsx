import React from "react";

export class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {label, value, onToggle} = this.props;
        return(
            <div className={`toggle`}>
                <div className={`toggle-btn ${value ? "on" : "off"}`}
                     onClick={() => {
                         onToggle(!value)
                     }}
                >
                    <div className="dot">

                    </div>
                </div>
                <div className="toggle-label">
                    {value ? label.on : label.off}
                </div>
            </div>
        );
    }
}
