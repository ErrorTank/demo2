import React from "react";
import {CommonInput} from "../../../../../../common/common-input/common-input";
import {discountApi} from "../../../../../../../api/common/app/discount-api";
import {DataTable} from "../../../../../../common/data-table/data-table";
import findIndex from "lodash/findIndex"
import cloneDeep from "lodash/cloneDeep"

export class MultipleCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      codes_used: [],
    };
  };

  handleClick = () => {
    let {value} = this.state;
    let {discountID, orgID, onChange, discount_codes: propsCodes} = this.props;
    let codes = value.trim().split(" ");
    let promises = [];
    for (let code of codes) {
      promises.push(discountApi.isCodeAvailable(code, discountID, orgID).then(res => {
        return {code, status: res}
      }))
    }
    Promise.all(promises).then(codes => {
      console.log(codes);
      let codes_used = codes.filter(each => !each.status).map(each => each.code);
      let accepted_code = codes.filter(each => each.status).map(each => each.code);
      this.setState({codes_used});
      onChange(propsCodes.filter(c => c.code).concat(accepted_code.map(code => ({code}))));
    })
  };



  render() {
    let {value} = this.state;
    let {discount_codes, onChange} = this.props;

    return (
      <div className={"multiple-code"}>
        <CommonInput
          value={value}
          onChange={val => this.setState({value: val})}

        />
        <button
          className="btn btn-primar submit-btn"
          onClick={this.handleClick}
          disabled={value.trim().split(" ").length < 2}
        >
          Submit
        </button>
        <MultipleCodeTable
          discount_codes={discount_codes.filter(c => c.code)}
          onChange={onChange}
        />
      </div>
    );
  }
}

const MultipleCodeTable = (props) => {
  let {discount_codes, onChange} = props;
  let columns = [{
    label: "Code",
    cellDisplay: (row) => row.code,
  }, {
    label: "",
    cellDisplay: (row) => (
      <i className="far fa-trash-alt"
         onClick={() => deleteCode(row.code)}
      ></i>
    )
  }];
  let deleteCode = (code) => {
    console.log(code)
    let _discount_codes = cloneDeep(discount_codes);
    console.log(_discount_codes)
    let index = findIndex(_discount_codes, c => c.code === code);
    _discount_codes.splice(index, 1);
    onChange(_discount_codes);
  };
  return (
    <DataTable
      columns={columns}
      rows={discount_codes}
    />
  );
};
