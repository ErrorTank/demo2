import React from "react";

export class Pagination extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        let {value, total, onClick} = this.props;
        return(
            <div className="app-pagination">
                {value !== 1 && (
                    <span className="navigate"
                          onClick={() => onClick(value - 1)}
                    >
                        Prev
                    </span>
                )

                }

                <span className={`app-page-link`}>
                   {[...Array(total)].map((each, i) => (
                       <span className={`page-count ${value === i+1 ? "active" : ""}`}
                             onClick={() => onClick(i + 1)}
                             key={i}
                       >
                        {i + 1}
                    </span>
                   ))
                   }
                </span>

                {value !== total && (
                    <span className="navigate"
                          onClick={() => onClick(value + 1)}
                    >
                        Next
                    </span>
                )

                }
            </div>
        );
    }
}
