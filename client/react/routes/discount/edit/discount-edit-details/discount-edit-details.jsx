import React, {Fragment} from "react";
import {PageFormLayout} from "../../../../common/page-form-layout/page-form-layout";
import {customHistory} from "../../../../main-route";
import {CommonFormControl} from "../../../../common/common-form-control/common-form-control";
import {DiscountEditForm} from "./discount-edit-form/discount-edit-form";
import {discountApi} from "../../../../../api/common/app/discount-api";

export class DiscountEditDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
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

    render(){
        let {selectedGroups, selectedOutings, data} = this.state;
        let {onChangeDiscount} = this.props;
        return(
            <PageFormLayout
                className="discount-edit-details-route"
                renderForm={(
                    <Fragment>
                        <DiscountEditForm
                            selectedOutings={selectedOutings}
                            selectedGroups={selectedGroups}
                            data={data}
                            editRoute
                            changeOrigin={(discount) => onChangeDiscount(discount)}
                            onChange={data => this.setState({data})}
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
