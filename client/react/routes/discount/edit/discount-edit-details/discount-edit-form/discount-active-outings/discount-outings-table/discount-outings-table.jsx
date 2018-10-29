
import React from "react";
import {Checkbox} from "../../../../../../../common/label-checkbox/checkbox/checkbox";
import findIndex from "lodash/findIndex"
import {DataTable} from "../../../../../../../common/data-table/data-table";
import cloneDeep from "lodash/cloneDeep"
import {formatDate, formatDateTimeWithTz} from "../../../../../../../utils/date-utils";


export const DiscountOutingsTable = ({outings, selectedOutings, onChange}) => {

  let handleChangeActiveOuting = (id, checked) => {
    if (checked) onChange(selectedOutings.length === 0 ? [{owner_id: id, allow_group_to_promote: false}] :  selectedOutings.concat({owner_id: id, allow_group_to_promote: false}));
    else onChange(selectedOutings.filter(group => group.owner_id != id));
  };

  let handleChangeActiveGroupPromote = (id, checked) => {
    let outings = cloneDeep(selectedOutings);
    let group = outings.find(o => o.owner_id == id);
    group.allow_group_to_promote = checked;
    onChange(outings);
  };

  const columns = [{
    label: "",
    cellClass: "col-checkbox",
    cellDisplay: (row) => (
      <Checkbox
        checked={findIndex(selectedOutings, (group) => group.owner_id === row.id) > -1}
        onChange={(value) => handleChangeActiveOuting(row.id, value)}
      />
    )
  }, {
    label: (<span>Outing URL</span>),
    cellDisplay: (row) => (
      <div>
        <div className="gr-name">
          {row.title}
        </div>
        <div className="gr-url">
          {row.access_code}
        </div>
      </div>
    )
  }, {
    label: (<span>Event Date/Time</span>),
    cellDisplay: ({event}) => (
      <div>
        <div className="gr-name">
          {event.title}
        </div>
        <div className="gr-url">
          {event.time_tbd ? formatDate(Object.assign({}, event.date_time, {month: event.date_time.month - 1}), "MMM DD, YYYY") + "@ TBA" : formatDateTimeWithTz(event.date_time)}
        </div>
      </div>
    )
  }, {
    label: "Group Leader Can Promote?",
    headerClassName: "group-promote",
    cellDisplay: (row) => (
      <div>
        { findIndex(selectedOutings, (outing) => outing.owner_id === row.id) > -1 && (
          <Checkbox
            checked={selectedOutings.find((outing) => outing.owner_id == row.id).allow_group_to_promote}
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
      rows={outings}
    />
  )
};
