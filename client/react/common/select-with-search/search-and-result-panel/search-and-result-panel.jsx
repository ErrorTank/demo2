import React from "react";
import {stringUtils} from "../../../utils/str-utils";
let {normalizedStr} = stringUtils;

export class SearchAndResultPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: ""
        };
    };

    searchByKeyword = (list, val) =>{
        if(!val) return list;
        return list.filter(each => {
            return normalizedStr(each.name).includes(normalizedStr(val))
        })
    };

    render(){
        let {value} = this.state;
        let {list, displayAs, onPick, current} = this.props;
        let filteredList = this.searchByKeyword(list, value);
        return(
            <div className="search-and-result">
                <div className="search-wrap">
                    <input type="text"
                           className="search-org"
                           value={value}
                           placeholder="Search..."
                           onChange={(e) => this.setState({value: e.target.value})}
                    />
                </div>

                <div className="org-list">
                    {filteredList.map((org, i) => (
                        <div className={`org-name ${(current && (org.id === current.id)) ? "h-light" : ""}`}
                             key={org.id}
                             onClick={() => onPick(org)}
                        >
                            {displayAs(org)}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
