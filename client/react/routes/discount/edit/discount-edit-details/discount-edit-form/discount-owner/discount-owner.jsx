import React, {Fragment} from "react";
import {orgApi} from "../../../../../../../api/common/app/org-api";
import {appModal} from "../../../../../../common/modals/modals";
import {discountApi} from "../../../../../../../api/common/app/discount-api";
import {CommonSelect} from "../../../../../../common/common-select/common-select";

export class DiscountOwner extends React.Component{
    constructor(props){
        super(props);
        this.state={
            owners: null,
            owner: props.owner,
            loading: true
        };
        orgApi.getOrg(props.orgID).then(org => {
            this.setState({loading: false, owners: org.sales_managers.concat(org.sales_people).filter(person => person.id)});
        })
    };

    handleChangeOwner = (id) => {
        const {discountID, onChange} = this.props;

        appModal.confirm({
            title: "Update this discount's owner",
            text: "Changing the owner of this discount will remove this code from all outings it currently work for.",
            btnText: "Update Owner",
            cancelText: "Cancel"
        }).then((confirm) => {
            if (confirm) {
                this.setState({loading: true});
                discountApi.reassignDiscount(discountID, id).then((owner) => {
                    this.setState({owner, loading: false});
                    onChange(owner);
                })
            }
        })
    };

    render(){
        let {loading, owner, owners} = this.state;
        return(
            <div className="discount-owner">
                {!loading && (
                    <Fragment>
                        <CommonSelect
                            label="Discount Owner"
                            className="discount-input"
                            value={owner}
                            list={owners}
                            displayAs={o => {
                                if(o){
                                    return (
                                        <div>{o.full_name} ({o.email})</div>
                                    )

                                }
                                return (
                                    <div>{owner.full_name} ({owner.email})</div>
                                )
                            }}
                            onChange={o => this.handleChangeOwner(o.id)}
                        />
                    </Fragment>
                )}
            </div>
        );
    }
}
