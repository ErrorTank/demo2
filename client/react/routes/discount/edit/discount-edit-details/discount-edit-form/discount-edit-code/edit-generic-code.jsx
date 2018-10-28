import React, {Fragment} from "react";
import {discountApi} from "../../../../../../../api/common/app/discount-api";
import debounce from "lodash/debounce";
import {CommonInput} from "../../../../../../common/common-input/common-input";

export class EditGenericCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: null
    };
  };

  render() {
    let {item, discount_codes, onChange, discountID, orgID, index} = this.props;
    let {check} = this.state;
    return (
      <Fragment>
            <span>
             <CommonInput type="text"
                          value={item.code}
                          onChange={(val) => {
                            let newVal = {...item};
                            newVal.code = val;
                            let newCodes = [...discount_codes];
                            newCodes[index] = newVal;
                            onChange(newCodes);
                            discountApi.isCodeAvailable(val, discountID, orgID).then((res) => {
                              this.setState({check: res})
                            })


                          }}
             />

           </span>
        <span className="generic-code-status">
              {orgID ? (
                <React.Fragment>
                  {check === "inactive" && (
                    <span className="error">
                                            <i className="icon fas fa-times"/>
                      {orgID ? "Code in use." : "You must select organization first!"}
                                        </span>
                  )}
                  {check === true && (
                    <span className="success">
                                            <i className="icon fas fa-check"/>
                                            Valid code.
                                        </span>
                  )}
                </React.Fragment>
              ) : (
                <span className="error">
                                    <i className="icon fas fa-times"/>
                                    You must select organization first!
                                </span>
              )}
            </span>
      </Fragment>


    );
  }
}
