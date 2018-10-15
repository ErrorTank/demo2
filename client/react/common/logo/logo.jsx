import React from "react";

export class Logo extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {label, imgSrc, onClick, className} = this.props;
        return(
            <div className={`logo ${className ? className :""}`}
                 onClick={onClick}
            >
                <div className="circle-img"

                >
                    <img src={imgSrc}/>
                </div>
                <p className="logo-label">
                    {label}
                </p>
            </div>
        );
    }
}
