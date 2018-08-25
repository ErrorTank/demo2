import React from "react";

export class InitTitle extends React.Component{
    constructor(props){
        super(props);

    };
    render(){
        let {title} = this.props;
        document.title = title;
        return this.props.children;
    }
}
