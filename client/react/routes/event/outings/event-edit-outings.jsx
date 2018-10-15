import React from "react";
import {PageFormLayout} from "../../../common/page-form-layout/page-form-layout";
import {DataTable} from "../../../common/data-table/data-table";
import {isPastOuting, mayNotMeetGoal} from "../../../utils/outing-utils";
import {formatMoney, formatNumber} from "../../../utils/format";
import {outingApi} from "../../../../api/common/app/outing-api";

export class EventEditOutings extends React.Component{
    constructor(props){
        super(props);
        this.state={
            outings: []
        };
        outingApi.getListByEvent(this.props.eventID).then((outings) => this.setState({outings}));
    };

    columns = [
        {
            label: (
                <span>
                    Outing
                    <br/>
                    URL
                </span>
            ),
            cellClass: "col-name",
            cellDisplay: (outing) => (
                <div>
                    <div className="title">
                        <div className="main-title">
                            {outing.title}
                        </div>
                        <div className="url-contain">
                            { isPastOuting(outing) && (
                                <span className="past-outing">
                                    Past Outing {!outing.paid_out && ' - Not paid out'}
                                </span>
                            ) }

                            { mayNotMeetGoal(outing) && (
                                <span className="may-not-meet-goal">
                                    May not meet goals!
                                </span>
                            ) }
                            <span className="url">
                                {outing.access_code}
                            </span>
                        </div>

                    </div>
                </div>
            )
        }, {
            label: "Sales Rep",
            cellDisplay: (outing) => outing.creator.full_name
        }, {
            label: "Total",
            sortable: true,
            cellDisplay: (outing) => outing.ticket_count
        }, {
            label: "Sold",
            cellDisplay: (outing) => (
                <div>
                    <div className="money">
                        {(outing.tickets_sold + outing.tickets_oi_sold).toFixed(0)} ({formatMoney(outing.collected)})
                    </div>
                    <div className="request-payout">
                        <span>
                            Request Payout
                        </span>
                    </div>
                </div>
            )
        }
    ];

    render(){
        return(
            <div className="event-edit-outings">
                <PageFormLayout
                    renderForm={(
                        <DataTable
                            className="outing-table"
                            pageSize={50}
                            columns={this.columns}
                            rows={this.state.outings}
                        />
                    )}
                />
            </div>
        );
    }
}
