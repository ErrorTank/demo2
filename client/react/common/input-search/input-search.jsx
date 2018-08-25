import React from "react";

export class InputSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: ""
        };
    };
    render(){
        let {className, onSearch} = this.props;
        let {value} = this.state;
        return(
            <div className={`input-search ${className}`}>
                <i className="fas fa-search"/>
                <input type="text"
                       placeholder="Search..."
                       value={value}
                       onChange={e => this.setState({value: e.target.value})}
                />
                <button className="go-btn"
                        onClick={() => onSearch(value)}
                >
                    Go
                </button>
            </div>
        );
    }
}
