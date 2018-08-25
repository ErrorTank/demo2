import React from "react";
import {SearchAndResultPanel} from "./search-and-result-panel/search-and-result-panel";
import {ClickOutside} from "../click-outside/click-outside";

export class SelectWithSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    };

    render() {
        let {className, placeholder, value, list, onPick, displayAs} = this.props;
        let {open} = this.state;
        return (
            <ClickOutside onClickout={() => this.setState({open: false})}>
                <div className={`select-with-search ${className}`}>
                    <div className="select-toggle"
                         onClick={() => {
                             this.setState({open: true})
                         }}
                    >
                        <span>{value ? displayAs(value) : placeholder}</span>
                        <i className="fas fa-sort-down"/>
                        {value && (
                            <i className="fas fa-times"
                               onClick={(e) => {
                                   e.stopPropagation();
                                   onPick(null)
                               }}
                            />
                        )}

                    </div>
                    {open && (
                        <div className="result-panel">
                            <SearchAndResultPanel
                                list={list}
                                current={value}
                                onPick={(data) => {
                                    this.setState({open: false});
                                    onPick(data)
                                }}
                                displayAs={displayAs}
                            />
                        </div>

                    )}

                </div>
            </ClickOutside>
        );
    }
}
