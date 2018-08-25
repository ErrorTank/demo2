import React from "react";

export class Logo extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {label, imgSrc} = this.props;
        return(
            <div className="logo">
                <div className="circle-img">
                    <img src={imgSrc}/>
                </div>
                <p className="logo-label">
                    {label}
                </p>
            </div>
        );
    }
}
