import React from "react";
import sortBy from "lodash/sortBy"
import uniqBy from "lodash/uniqBy"
import findIndex from "lodash/findIndex"
import isEmpty from "lodash/isEmpty"
import {Checkbox} from "../../../../../../../common/label-checkbox/checkbox/checkbox";
import {formatDate, formatDateTimeWithTz} from "../../../../../../../utils/date-utils";
import {LabelCheckbox} from "../../../../../../../common/label-checkbox/label-checkbox";

export class DiscountActiveOutingsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      outings: this.getOutingList(props.outings)
    };

  }

  componentWillReceiveProps(nextProps){
    let {outings} = nextProps;
    if (outings.length != this.props.outings.length) this.setState({outings: this.getOutingList(outings)})
  }

  isGroupChecked = (group) => {
    return group.outings.filter(outing => this.props.selectedOutings.map(o => o.owner_id).indexOf(outing.id) > -1).length > 0
  };

  getOutingList = (_outings) => {
    let {selectedOutings} = this.props;
    let outings = sortBy(_outings, (outing) => -selectedOutings.map(o => o.owner_id).indexOf(outing.id));

    let partOfMultiOutingPage = uniqBy(outings.map(o => o.group), "id").map(group => {
      return {...group, outings: outings.filter((outing) => group.id === outing.group.id)}
    });

    partOfMultiOutingPage = partOfMultiOutingPage.filter(group => {
      return group.outings.filter(o => o.show_on_group_page).length > 0
    });

    let notPartOfMultiOutingPage = outings.filter((outing) => !outing.show_on_group_page);

    let index = findIndex(partOfMultiOutingPage, group => {
      return !this.isGroupChecked(group)
    });

    let outingsNotPartOfMultiSelected = notPartOfMultiOutingPage.filter((outing) => selectedOutings.map(o => o.owner_id).indexOf(outing.id) > -1);

    if (index == -1) {
      return partOfMultiOutingPage.concat({
        name: "other",
        outings: notPartOfMultiOutingPage
      });
    } else {
      if (outingsNotPartOfMultiSelected.length > 0) {
        partOfMultiOutingPage.splice(index, 0, {
          name: "other",
          outings: outingsNotPartOfMultiSelected
        });
      }
    }

    let outingsNotPartOfMultiNotSelected = notPartOfMultiOutingPage.filter((outing) => selectedOutings.map(o => o.owner_id).indexOf(outing.id) == -1);

    return partOfMultiOutingPage.concat({
      name: "other",
      outings: outingsNotPartOfMultiNotSelected
    });
  };


  handleActiveOutings(outingIds, selected) {

    let {selectedOutings, onChange} = this.props;

    let withoutTargetOutings = selectedOutings.filter((outing) => findIndex(outingIds, id => id == outing.owner_id) == -1);

    let targetOutings = selected ? withoutTargetOutings.concat(outingIds.map(id => ({owner_id: id, allow_group_to_promote: false}))) : withoutTargetOutings;

    onChange(targetOutings);
  }


  render() {

    let {selectedOutings, outings} = this.props;
    let SectionToggle = (props) => {
      let check = () => {
        if (isEmpty(selectedOutings)) {
          return false;
        }

        let filter = outings.filter((outing) => outing.show_on_group_page && outing.group.id === props.by.id);
        return filter.length > 0 && filter.find((t)=> findIndex(selectedOutings, outing => outing.owner_id == t.id) == -1) == null;
      };

      let setSelected = (selected) => {
        let filter = outings.filter((outing) => outing.show_on_group_page && outing.group.id === props.by.id);
        this.handleActiveOutings(filter.map(each => each.id), selected);
      };

      return (
        <LabelCheckbox
          checked={check()}
          label={props.label}
          onChange={(value) => setSelected(value)}
        />
      )
    };

    let summary = (outingGroupBy) => {
      let active = outingGroupBy.outings.filter((o) => o.show_on_group_page).length;
      return `${active} of ${outingGroupBy.outings.length} group outings`;
    };


    return (
      <div className="discount-active-outings-table">
        { this.state.outings.map((outingGroupBy, i) => (
          <div className={`outing-table ${outingGroupBy.id ? "part-of-group-page" : ""}`}
                key={i}
          >
            { outingGroupBy.id && outingGroupBy.outings.filter(o => o.show_on_group_page).length > 0 && (
              <div className="header">
                <SectionToggle
                  by={outingGroupBy}
                  label={(
                    <span>
                        { isEmpty(outingGroupBy.name) ? `Unspecific Group` : outingGroupBy.name } &nbsp;
                        <span>({outingGroupBy.access_code})</span>
                      </span>
                  )}
                />

                <div className="outings-count">
                  {summary(outingGroupBy)}
                </div>
              </div>
            )}

            { outingGroupBy.name === 'other' && (
              <div className="header not-part-header">
                <h3>Not part of a group page</h3>
              </div>
            )}

            <div className="body">
              {outingGroupBy.outings
                .filter((o) => outingGroupBy.id ? o.show_on_group_page : true)
                .map((outing, idx) => (
                  <div className="outing"
                       key={idx}
                  >
                    <Checkbox
                      checked={findIndex(selectedOutings, o => o.owner_id == outing.id) > -1}
                      onChange={(value) => this.handleActiveOutings([outing.id], value)}
                    />

                    <div className="name">
                      <span>{outing.title}</span><br/>
                      <span>
                        {outing.access_code}
                      </span>
                    </div>

                    <div className="event">
                      {outing.event.title}
                      <br/>
                      {outing.event.time_tbd
                        ? formatDate(Object.assign({}, outing.event.date_time, {month: outing.event.date_time.month - 1}))
                        : formatDateTimeWithTz(outing.event.date_time)
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    )
  }
}
