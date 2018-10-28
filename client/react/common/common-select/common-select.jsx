import React from "react";
import {ClickOutside} from "../click-outside/click-outside";

export class CommonSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    };

    render() {
        let {open} = this.state;
        let {value, label, list, displayAs, className, onChange, compare, placeholder, displaySelected, disabled = false} = this.props;

        return (
            <div className={`common-select ${className}`}>
                {label && (
                    <div className="select-label">
                        {label}
                    </div>
                )}

                <ClickOutside onClickout={() => this.setState({open: false})}>
                    <div className={`select ${disabled ? "disabledEvent disabled" : ""}`}
                         onClick={() => !open && this.setState({open: true})}
                    >
                        <div className="select-toggle"

                        >
                            {(value!==null && value !==undefined) ? displaySelected ? displaySelected(value) : displayAs(value) : placeholder ? placeholder : ""}
                            <i className="fas fa-sort-down"/>
                        </div>
                        {open && (
                            <div className="select-content">
                                {list.map((each, i) => (
                                    <div className={`content ${compare ? compare(each, value) ? "active" : "" : ""}`}
                                         key={i}
                                         onClick={() => {
                                             this.setState({open: false});
                                             onChange(each);
                                         }}
                                    >
                                        {displayAs(each)}
                                    </div>
                                ))

                                }
                            </div>
                        )

                        }
                    </div>
                </ClickOutside>
            </div>
        );
    }
}
