import React from "react";
import {InputSearch} from "../../../../../../common/input-search/input-search";
import {groupApi} from "../../../../../../../api/common/app/group-api";
import {DiscountGroupsTable} from "./discount-groups-table/discount-groups-table";
export class DiscountActiveGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };

    groupApi.getGroupByOrganization(props.orgID).then(groups => this.setState({groups}))
  }


  render() {

    let {groups, keyword} = this.state;
    let {selectedGroups, onChangeSelectedGroups} = this.props;

    return (
      <div className="discount-input common-input discount-active-groups">
        <div className="input-label">
          Groups this discount is valid for

          <div className="inputs">
            <InputSearch
              className="search-discount"
              onSearch={kw => this.setState({keyword: kw})}
            />
          </div>
        </div>

        { groups && (
          <DiscountGroupsTable
            selectedGroups={selectedGroups}
            groups={groups.filter(g => g.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || g.access_code.toLowerCase().indexOf(keyword.toLowerCase()) > -1)}
            onChange={(selectedGroups) => onChangeSelectedGroups(selectedGroups)}
          />
        )}
      </div>
    );
  }
}
