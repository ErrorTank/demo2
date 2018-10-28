import React from "react";
import {Checkbox} from "./checkbox/checkbox";

export class LabelCheckbox extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {className = "", onChange, checked, label} = this.props;
        return (
            <div
                className={`label-checkbox ${className}`}
                onClick={() => onChange(!checked)}
            >
                <Checkbox
                    onChange={() => onChange(!checked)}
                    checked={checked}
                />

                <span className="label">{label}</span>
            </div>
        );
    }
}
