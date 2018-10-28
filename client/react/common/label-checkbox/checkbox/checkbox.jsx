import React from "react";

export class Checkbox extends React.Component {
    handleClick = (e) => {
        e.stopPropagation();
        this.props.onChange && this.props.onChange(!this.props.checked, e);
    };

    render() {
        const {checked, className = ""} = this.props;
        return (
            <div
                className={`checkbox ${className} ${checked ? "checked" : ""}`}
                onClick={this.handleClick}
            >
                { checked && (<i className="fas fa-check check-icon"></i>)  }
            </div>
        );
    }
}
