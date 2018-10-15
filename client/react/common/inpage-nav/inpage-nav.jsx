import React from "react";
import {customHistory} from "../../main-route";

export class InpageNav extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {links, activeRoute} = this.props;
        return(
            <div className="inpage-nav">
                <ul>
                    {links.map((link, i)=> (
                        <li key={i}>
                            <div
                                onClick={() => link.to && customHistory.push(link.to)}
                                className={`${link.active!==undefined ? link.active ? "active" : "" :  activeRoute === link.route ? "active" : ""} ${link.disabled ? "disabled" : ""}`}
                            >
                                {link.label}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
