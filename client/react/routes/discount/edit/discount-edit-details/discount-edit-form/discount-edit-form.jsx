import React from "react";
import {CommonInput} from "../../../../../common/common-input/common-input";
import {DiscountOwner} from "./discount-owner/discount-owner";
import {DiscountTypeEdit} from "./discount-type-edit/discount-type-edit";
import {DateInput} from "../../../../../common/common-input/date-input/date-input";
import {addDay, parseDate} from "../../../../../utils/date-utils";
import {InputDate} from "../../../../../common/input-date/input-date";
import {LabelCheckbox} from "../../../../../common/label-checkbox/label-checkbox";
import {formatGmDateTime} from "../../../../../utils/format";
import {Toggle} from "../../../../../common/toggle/toggle";
import {DiscountEditCode} from "./discount-edit-code/discount-edit-code";
import {DiscountActiveGroups} from "./discount-active-groups/discount-active-groups";
import {DiscountPastOuting} from "./discount-past-outing/discount-past-outing";
import {DiscountActiveOutings} from "./discount-active-outings/discount-active-outings";

export class DiscountEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  handleChangeData = obj => {
    let {data, onChange} = this.props;
    onChange({...data, ...obj});
  };

  render() {
    let {data, editRoute, changeOrigin, onChange, selectedGroups, onChangeSelectedGroups, onDeleteDiscount, selectedOutings, onChangeSelectedOutings} = this.props;
    let {name, description, id, creator, organization, valid_from, valid_thru, allow_use_on_multiple_outings, discount_codes} = data;
    return (
      <div className="discount-edit-form">
        <CommonInput
          className="discount-input"
          label="Discount Name"
          value={name}
          onChange={val => this.handleChangeData({name: val})}
        />
        <CommonInput
          className="discount-input"
          label="Discount Description"
          value={description}
          onChange={val => this.handleChangeData({description: val})}
        />
        {editRoute && (
          <DiscountOwner
            discountID={id}
            onChange={(owner) => {
              this.handleChangeData({creator: owner});
              changeOrigin({...data, ...{creator: owner}})
            }}
            orgID={organization.id}
            owner={creator}
          />
        )}
        <div className="discount-input common-input">
          <div className="input-label">
            Discount
          </div>
          <DiscountTypeEdit
            data={data}
            onChange={data => onChange(data)}
          />
        </div>
        <div className="date-range discount-input">

          {(valid_from != null || valid_thru != null) && (
            <div className="date-wrapper">
              <div className="discount-date-input">
                <InputDate
                  type="text"
                  onChange={valid_from => this.handleChangeData({valid_from})}
                  value={valid_from || ""}
                  label="Valid From"
                />
              </div>

              <div className="discount-date-input">
                <InputDate
                  type="text"
                  onChange={valid_thru => this.handleChangeData({valid_thru})}
                  value={valid_thru || ""}
                  label="To"
                />
              </div>

            </div>
          )}

          <LabelCheckbox
            className="toggle-date-range"
            label="No date range restriction"
            onChange={(checked) => {
              if (checked) this.handleChangeData({valid_from: null, valid_thru: null});
              else this.handleChangeData({
                valid_from: formatGmDateTime(new Date()),
                valid_thru: formatGmDateTime(addDay(new Date(), 1))
              });
            }}
            checked={!valid_from && !valid_thru}
          />

        </div>
        <div className="discount-input common-input">
          <div className="input-label">
            Can customers use this code on multiple outings?
          </div>
          <Toggle
            label={{
              on: "On",
              off: "Off"
            }}
            value={allow_use_on_multiple_outings}
            onToggle={(val) => this.handleChangeData({allow_use_on_multiple_outings: val})}
          />
        </div>
        <DiscountEditCode
          discountID={id}
          orgID={organization.id}
          discount_codes={discount_codes}
          onChange={discount_codes => this.handleChangeData({discount_codes})}
        />
        <DiscountActiveOutings
          orgID={organization.id}
          selectedOutings={selectedOutings}
          onChangeSelectedOutings={onChangeSelectedOutings}
        />
        <DiscountActiveGroups
          orgID={organization.id}
          selectedGroups={selectedGroups}
          onChangeSelectedGroups={onChangeSelectedGroups}
        />
        <DiscountPastOuting
          discountID={id}
        />
        <a className="delete-discount"
           onMouseDown={() => onDeleteDiscount()}>
          <u>Delete this discount</u>
        </a>
      </div>
    );
  }
}
