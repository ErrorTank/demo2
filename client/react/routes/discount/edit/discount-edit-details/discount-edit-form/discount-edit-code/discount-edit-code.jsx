import React, {Fragment} from "react";
import {Radio} from "../../../../../../common/radio/radio";
import debounce from "lodash/debounce"
import {CommonInput} from "../../../../../../common/common-input/common-input";
import {discountApi} from "../../../../../../../api/common/app/discount-api";
import {EditGenericCode} from "./edit-generic-code";
import {MultipleCode} from "./multiple-code";
import cloneDeep from "lodash/cloneDeep"

export class DiscountEditCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originCode: props.discount_codes
    };
  };

  handleCheckGeneric() {
    let {originCode} = this.state;
    let {discount_codes, onChange} = this.props;
    if (discount_codes.length === 1) return;
    onChange(originCode.length == 1 ? originCode : [{code: null}]);
  }

  handleCheckMultiple() {
    let {originCode} = this.state;
    let {discount_codes, onChange} = this.props;
    if (discount_codes.length >= 2) return;
    onChange(originCode.length >= 2 ? originCode : [{code: null}, {code: null}]);
  }

  handleChangeMultiple(codes) {
    let {onChange} = this.props;
    let _codes = cloneDeep(codes);
    if (codes.length === 0) _codes = [{code: null}, {code: null}];
    if (codes.length === 1) _codes = [codes[0], {code: null}];
    onChange(_codes);
  }


  render() {
    let {orgID, discountID, discount_codes, onChange} = this.props;
    return (
      <div className="discount-input common-input">
        <div className="input-label">
          Use individual codes for each customer or one generic code shared by all?
        </div>
        <div className="form-radio">
          <div className="radio-inline">
            <Radio
              checked={discount_codes.length === 0}
              onChange={() => onChange([])}
              label={"Generate unique codes"}
            />
          </div>
        </div>
        <div className="form-radio">
          <div className="radio-inline">
            <Radio
              checked={discount_codes.length === 1}
              onChange={() => this.handleCheckGeneric()}
              label={"Use generic code"}
            />
          </div>
          {discount_codes.length === 1 && (
            <span>
              {discount_codes.map((each, i) => (
                <span
                  key={i}
                >
                  <EditGenericCode
                    item={each}
                    discount_codes={discount_codes}
                    onChange={discount_codes => onChange(discount_codes)}
                    discountID={discountID}
                    orgID={orgID}
                    index={i}
                  />

                </span>
              ))}
            </span>
          )}
        </div>
        <div className="form-radio">
          <div className="radio-inline">
            <Radio
              checked={discount_codes.length >= 2}
              onChange={() => this.handleCheckMultiple()}
              label={"Multiple Discount Codes"}
            />
          </div>

          { discount_codes.length >= 2 && (
           <MultipleCode
            discountID={discountID}
            orgID={orgID}
            discount_codes={discount_codes}
            onChange={discount_codes => this.handleChangeMultiple(discount_codes)}
           />
          )}


        </div>
      </div>
    );
  }
}
