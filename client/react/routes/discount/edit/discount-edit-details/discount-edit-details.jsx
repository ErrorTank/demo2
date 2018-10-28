import React, {Fragment} from "react";
import {PageFormLayout} from "../../../../common/page-form-layout/page-form-layout";
import {customHistory} from "../../../../main-route";
import {CommonFormControl} from "../../../../common/common-form-control/common-form-control";
import {DiscountEditForm} from "./discount-edit-form/discount-edit-form";
import {discountApi} from "../../../../../api/common/app/discount-api";
import {appModal} from "../../../../common/modals/modals";

export class DiscountEditDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {...props.discount}
    };
    this.getActiveOutings(props.discount.id);
    this.getActiveGroups(props.discount.id);
  };

  getActiveOutings = (discountId) => {
    return discountApi.getOutingIdsByDiscount(discountId).then((activeOutings) => {
      this.setState({
        activeOutings,
        selectedOutings: activeOutings
      })
    })
  };

  getActiveGroups = (discountId) => {
    return discountApi.getDiscountAppliedGroup(discountId).then((activeGroups) => {
      this.setState({
        activeGroups,
        selectedGroups: activeGroups
      })
    })
  };

  deleteDiscount = () => {
    appModal.confirm({text: <span>Are you sure you want to delete this discount? This action cannot be undone.</span>, title: "Delete discount"}).then((accept) => {
      if (accept) {
        discountApi.deleteDiscount(this.props.discount.id).then(() => {
          customHistory.push(`/discounts`);
        })
      }
    });
  };

  render() {
    let {selectedGroups, selectedOutings, data} = this.state;
    let {onChangeDiscount} = this.props;
    return (
      <PageFormLayout
        className="discount-edit-details-route"
        renderForm={(
          <Fragment>
            <DiscountEditForm
              selectedOutings={selectedOutings}
              selectedGroups={selectedGroups}
              onDeleteDiscount={this.deleteDiscount}
              data={data}
              editRoute
              changeOrigin={(discount) => onChangeDiscount(discount)}
              onChange={data => this.setState({data})}
              onChangeSelectedGroups={(selectedGroups) => this.setState({selectedGroups})}
            />
          </Fragment>
        )}
        renderControl={(
          <CommonFormControl
            onCancel={() => customHistory.push("/discounts")}
            onSave={() => this.save()}
            canSave={true}
          />
        )}
      />
    );
  }
}
