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
        let {value, label, list, displayAs, className, onChange, compare} = this.props;
        return (
            <div className={`common-select ${className}`}>
                <div className="select-label">
                    {label}
                </div>
                <ClickOutside onClickout={() => this.setState({open: false})}>
                    <div className="select"
                         onClick={() => !open && this.setState({open: true})}
                    >
                        <div className="select-toggle"

                        >
                            {displayAs(value)}
                            <i className="fas fa-sort-down"/>
                        </div>
                        {open && (
                            <div className="select-content">
                                {list.map((each, i) => (
                                    <div className={`content ${compare(each, value) ? "active" : ""}`}
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
