import React, {Fragment} from "react";
import {PageFormLayout} from "../../../../common/page-form-layout/page-form-layout";
import {customHistory} from "../../../../main-route";
import {CommonFormControl} from "../../../../common/common-form-control/common-form-control";
import {DiscountEditForm} from "./discount-edit-form/discount-edit-form";
import {discountApi} from "../../../../../api/common/app/discount-api";
import {appModal} from "../../../../common/modals/modals";
import isEqual from "lodash/isEqual"
import findIndex from "lodash/findIndex"

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
      console.log(activeOutings)
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

  getActiveOutingsChanged = (oriOutings, newOutings) => {
    if (!oriOutings) return [];
    let outingsChanged = newOutings.filter(newOuting => findIndex(oriOutings, o => o.owner_id == newOuting.owner_id) == -1);

    for (let outing of oriOutings) {
      let outingFinded = newOutings.find(o => o.owner_id == outing.owner_id);
      if (!outingFinded) outingsChanged.push({owner_id: outing.owner_id, allow_group_to_promote: false, type: "removed"});
      else if (outingFinded.allow_group_to_promote != outing.allow_group_to_promote) {
        outingsChanged.push(outingFinded);
      }
    }
    return outingsChanged;
  };

  save = () => {
    let {activeOutings, selectedOutings, selectedGroups, activeGroups, data} = this.state;
    let {onChangeDiscount, discount} = this.props;
    let upsertDiscount = () => {
      return new Promise((resolve, reject)=>{
        discountApi.upsertDiscount(data).then((data) => {
          onChangeDiscount(data);
          this.setState({data});
          resolve();
        })
      })
    };
    let updateActiveOutings = (activeOutingsChanged) => {
      return new Promise((resolve, reject)=> {
        let promises = [];
        for (let outing of activeOutingsChanged) {
          promises.push(discountApi.toggleDiscountOuting(data.id, outing.owner_id, outing.type != "removed", outing.allow_group_to_promote))
        }
        Promise.all(promises).then(() => {
          this.setState({activeOutings: selectedOutings}, () => resolve());
        });
      })
    };
    let updateActiveGroups = (activeGroupsChanged) => {
      return new Promise((resolve, reject)=> {
        let promises = [];
        for (let group of activeGroupsChanged) {
          promises.push(discountApi.toggleDiscountGroup(data.id, group.owner_id, group.type != "removed", group.allow_group_to_promote))
        }
        Promise.all(promises).then(() => {
          this.setState({activeGroups: selectedGroups}, () => resolve());
        });
      })
    };



    let promisesSave = [];
    if (!isEqual(data, discount)) promisesSave.push(upsertDiscount());
    let activeOutingsChanged = this.getActiveOutingsChanged(activeOutings, selectedOutings);
    if (activeOutingsChanged.length > 0) promisesSave.push(updateActiveOutings(activeOutingsChanged));
    let activeGroupsChanged = this.getActiveOutingsChanged(activeGroups, selectedGroups);
    if (activeGroupsChanged.length > 0) promisesSave.push(updateActiveGroups(activeGroupsChanged));

    Promise.all(promisesSave).then(() => {
      console.log("saved")
    });
  };

  render() {
    let {selectedGroups, selectedOutings, data} = this.state;
    let {onChangeDiscount} = this.props;
    console.log(selectedOutings)
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
              onChangeSelectedOutings={(selectedOutings) => this.setState({selectedOutings})}
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
