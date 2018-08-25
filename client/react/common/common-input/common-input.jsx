import React from "react";

export class CommonInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {label, className, onChange, ...all} = this.props;
        return(
            <div className={`common-input ${className}`}>
                <div className="input-label">
                    {label}
                </div>
                <div className="input-wrap">
                    <input
                        {...all}
                        onChange={e => onChange(e.target.value)}
                    />
                </div>
            </div>
        );
    }
}
