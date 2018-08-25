import React from "react";

export class PageFormLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {renderForm, renderControl} = this.props;
        return(
            <div className="page-form-layout">
                <div className="page-form">
                    {renderForm}
                </div>
                <div className="page-form-control">
                    {renderControl}
                </div>
            </div>
        );
    }
}
