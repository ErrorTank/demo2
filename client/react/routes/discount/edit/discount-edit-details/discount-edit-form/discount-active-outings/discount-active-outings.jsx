import React from "react";
import {outingApi} from "../../../../../../../api/common/app/outing-api";
import {InputSearch} from "../../../../../../common/input-search/input-search";
import {LabelCheckbox} from "../../../../../../common/label-checkbox/label-checkbox";
import {DiscountOutingsTable} from "./discount-outings-table/discount-outings-table";
import {DiscountActiveOutingsTable} from "./discount-active-outings-table/discount-active-outings-table";

export class DiscountActiveOutings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGroupBy: false,
      keyword: "",
      outings: null
    };
    outingApi.getOutingBriefsByOrg(props.orgID).then((outings) => this.setState({
      outings
    }));
  };

  render() {

    let {isGroupBy, keyword, outings} = this.state;
    let {selectedOutings, onChangeSelectedOutings} = this.props;
    let filteredOutings = outings && outings.filter(outing =>
      outing.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
      || outing.event.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
      || outing.access_code.toLowerCase().indexOf(keyword.toLowerCase()) > -1
    );
    return (
      <div className="discount-input common-input discount-active-outings">
        <div className="input-label">
          Active outings this discount is valid for


        </div>
        <div className="inputs">
          <div>
            <LabelCheckbox
              checked={isGroupBy}
              label="Group by group pages"
              onChange={(checked) => this.setState({isGroupBy: checked})}
            />
          </div>

          <div>
            <InputSearch
              className="search-outings"
              onSearch={kw => this.setState({keyword: kw})}
            />
          </div>

        </div>
        {outings && (
          <div>
            { isGroupBy ?
              <DiscountActiveOutingsTable
                selectedOutings={selectedOutings}
                outings={filteredOutings}
                onChange={(selectedOutings) => onChangeSelectedOutings(selectedOutings)}
              />
              :
              <DiscountOutingsTable
                selectedOutings={selectedOutings}
                outings={filteredOutings}
                onChange={(selectedOutings) => onChangeSelectedOutings(selectedOutings)}
              />
            }
          </div>
        )}
      </div>
    );
  }
}
