import React, {Fragment} from "react";
import {customHistory} from "../../../main-route";
import {arrUtils} from "../../../utils/arr-utils";
import {InitTitle} from "../../../common/init-title/init-title";
import {PageFormLayout} from "../../../common/page-form-layout/page-form-layout";
import {CommonFormControl} from "../../../common/common-form-control/common-form-control";
import {Logo} from "../../../common/logo/logo";
import {InpageNav} from "../../../common/inpage-nav/inpage-nav";
import {discountApi} from "../../../../api/common/app/discount-api";
import {orgApi} from "../../../../api/common/app/org-api";
import {DiscountChildRoute} from "./discount-child-route/discount-child-route";

export class DiscountEditRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            discount: null,
            org: null
        };
        this.getDiscount(props.match.params.discountID);
    };

    getDiscount = (discountId) => {
        this.setState({
            discount: null,
            loading: true
        });

        return discountApi.getDiscount(discountId).then((discount)=> {
            orgApi.getBriefs().then(orgs => {
                this.setState({
                    discount,
                    loading: false,
                    org: orgs.find(org => org.id === discount.organization.id)
                })
            });
        });
    };

    render() {

        let {loading, discount, org} = this.state;
        console.log(discount)
        console.log(org)
        const {discountID} = this.props.match.params;
        const navLinks = [{
            to: `/discount/${discountID}/details`,
            label: "Details",
            route: "details"
        }, {
            to: `/discount/${discountID}/integration`,
            label: "Integration",
            route: "integration",
            condition: () => discount && discount.$type === "ticket_level_discount" && (org.ticketing_provider === 1 || org.ticketing_provider === 3),
        }, {
            to: `/discount/${discountID}/deactivations`,
            label: "Deactivations",
            route: "deactivations"
        }];
        return (
            <InitTitle
                title="Groupmatics Management"
            >
                {!loading && (
                    <Fragment>
                        <div className="discount-edit-route">
                            <div className="header">
                                <div className="status-wrap">
                                    <div>
                                            <span className="navigate-to-list"
                                                  onClick={() => customHistory.push("/discounts")}
                                            >
                                                <i className="fas fa-arrow-left"/>
                                                &nbsp;
                                                Back to Events
                                            </span>
                                    </div>
                                    <div className="logo-wrapper">
                                        <Logo
                                            label={discount.name}
                                            imgSrc={org.logo_url}
                                        />
                                    </div>
                                    <div className="actions">
                                        { discount && discount.discount_codes.length === 0 && (
                                            <div className="download-section">
                                                <input
                                                    type="number"
                                                    value={this.state.qty || ""}
                                                    placeholder="Qty"
                                                    onChange={(e) => this.setState({qty: e.target.value}) }
                                                />
                                                <button className={"btn"}
                                                        disabled={_.isEmpty(this.state.qty) || this.state.qty <= 0}
                                                        onClick={() =>  discountApi.downloadIndividualDiscountCodes(discount.id, this.state.qty)}
                                                >Download Codes</button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <InpageNav links={navLinks.filter((link) => link.condition == null || link.condition())}
                                           activeRoute={this.props.match.params.step}
                                />
                            </div>
                            <DiscountChildRoute
                                discount={discount}
                                ticketingProvider={org.ticketing_provider}
                                discountID={discountID}
                                onChangeDiscount={(discount) => this.setState({discount})}
                            />
                        </div>

                    </Fragment>

                )

                }
            </InitTitle>
        );
    }
}
