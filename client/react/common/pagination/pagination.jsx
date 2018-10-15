import React from "react";

export class Pagination extends React.Component{
    constructor(props){
        super(props);
    };

    getShowPages = () => {
        let total = this.props.total;
        let r = {
            from: Math.floor((this.props.value - 1) / 10) * 10 + 1,
            to  : Math.min(total, Math.floor((this.props.value - 1) / 10) * 10 + 10)
        };
        if (this.props.value != 1 && this.props.value == r.from) {
            r.from--;
            r.to--;
        } else if (this.props.value != total && this.props.value == r.to) {
            r.from++;
            r.to++;
        }

        let shownPages = [];

        if (r.from > 1) {
            shownPages.push({
                page: 1,
                label: 1
            });
        }
        for (var p = r.from; p <= r.to; p++) {
            shownPages.push({
                page: p,
                label: (p == r.from && r.from > 2) || (p == r.to && r.to < total - 1) ? "..." : p
            });
        }
        if (r.to < total) {
            shownPages.push({
                page: total,
                label: total
            });
        }
        return shownPages;
    };

    render(){
        let {value, total, onClick} = this.props;
        let pages =  this.getShowPages();
        console.log(pages);
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
                   {pages.map((each, i) => (
                       <span className={`page-count ${value === each.page ? "active" : ""}`}
                             onClick={() => onClick(each.page)}
                             key={i}
                       >
                        {each.label}
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
