import React from "react";
import ReactDOM from "react-dom";
export class ClickOutside extends React.Component {

    constructor(props) {
        super(props);


    }

    cancelClickOutside = null;

    componentWillUnmount(){
        this.removeEvent();
    };

    componentDidMount() {
        this.cancelClickOutside = this.clickOutside();
    }

    removeEvent = () =>{
        if(this.cancelClickOutside) {
            this.cancelClickOutside();
            this.cancelClickOutside = null;
        }
    };

    clickOutside = () => {
        let clickFunc = (e) => {
            setTimeout(() => {
                let elem = ReactDOM.findDOMNode(this);
                if(!elem || !elem.contains(e.target)) {
                    this.props.onClickout(e.target);
                }
            })
        };
        window.addEventListener('click', clickFunc);

        return () => {
            window.removeEventListener('click', clickFunc);
        };
    };

    render() {
        return React.Children.only(this.props.children);
    }
}
