
import React from "react";
import {Checkbox} from "../../../../../../../common/label-checkbox/checkbox/checkbox";
import findIndex from "lodash/findIndex"
import {DataTable} from "../../../../../../../common/data-table/data-table";
import cloneDeep from "lodash/cloneDeep"


export const DiscountGroupsTable = ({groups, selectedGroups, onChange}) => {

  let handleChangeActiveGroup = (id, checked) => {
    if (checked) onChange(selectedGroups.length === 0 ? [{owner_id: id, allow_group_to_promote: false}] :  selectedGroups.concat({owner_id: id, allow_group_to_promote: false}));
    else onChange(selectedGroups.filter(group => group.owner_id != id));
  };

  let handleChangeActiveGroupPromote = (id, checked) => {
    let groups = cloneDeep(selectedGroups);
    let group = groups.find(o => o.owner_id == id);
    group.allow_group_to_promote = checked;
    onChange(groups);
  };

  const columns = [{
    label: "",
    cellClass: "col-checkbox",
    cellDisplay: (row) => (
      <Checkbox
        checked={findIndex(selectedGroups, (group) => group.owner_id === row.id) > -1}
        onChange={(value) => handleChangeActiveGroup(row.id, value)}
      />
    )
  }, {
    label: (<span>Group Name</span>),
    cellDisplay: (row) => (
      <div>
        <div className="gr-name">
          {row.name}
        </div>
        <div className="gr-url">
          {row.access_code}
        </div>
      </div>
    )
  }, {
    label: "Group Leader Can Promote?",
    headerClassName: "group-promote",
    cellDisplay: (row) => (
      <div>
        { findIndex(selectedGroups, (group) => group.owner_id === row.id) > -1 && (
          <Checkbox
            checked={selectedGroups.find((group) => group.owner_id == row.id).allow_group_to_promote}
            onChange={(value) => handleChangeActiveGroupPromote(row.id, value)}
          />
        )}
      </div>
    )
  }];

  return (
    <DataTable
      className="dg-table"
      columns={columns}
      rows={groups}
    />
  )
};
