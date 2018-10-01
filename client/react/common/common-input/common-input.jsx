import React from "react";

export class CommonInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {label, className, onChange,isTextArea = false, ...all} = this.props;
        return(
            <div className={`common-input ${className}`}>
                <div className="input-label">
                    {label}
                </div>
                <div className="input-wrap">
                    {isTextArea ? (
                        <textarea
                            {...all}
                            onChange={e => onChange(e.target.value)}
                        >

                        </textarea>
                    ) : (
                        <input
                            {...all}
                            onChange={e => onChange(e.target.value)}
                        />
                    )

                    }

                </div>
            </div>
        );
    }
}
