import React from "react";
import {discountApi} from "../../../../../../../api/common/app/discount-api";
import {formatDate, formatDateTimeWithTz} from "../../../../../../utils/date-utils";

export class DiscountPastOuting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pastOutings: null
    };
    discountApi.getPastOutingAppliedDiscount(props.discountID).then((pastOutings) => this.setState({pastOutings}));
  }

  render() {
    let {pastOutings} = this.state;
    return (
      <div className="discount-input common-input discount-past-outings">
        <div className="input-label">
          Past outings that used this discount
        </div>

        { pastOutings != null && (
          pastOutings.length > 0 ?
            pastOutings.map((pastOuting, i) => (
              <div className="line"
                   key={i}
              >
                <div className="title">
                  {pastOuting.title}
                </div>

                <div className="content">
                  {pastOuting.event.title}: {pastOuting.event.time_tbd
                  ? formatDate(Object.assign({}, pastOuting.event.date_time, {month: pastOuting.event.date_time.month - 1}), "MMM DD, YYYY") + " TBA"
                  : formatDateTimeWithTz(pastOuting.event.date_time)}
                </div>
              </div>
            )) :
            <span>No data</span>
        )
        }
      </div>
    );
  }
}
