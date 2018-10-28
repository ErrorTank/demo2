import React from "react";

import _ from "lodash"

import {InitTitle} from "../../../common/init-title/init-title";
import {InputSearch} from "../../../common/input-search/input-search";
import {SelectWithSearch} from "../../../common/select-with-search/select-with-search";
import {CommonSelect} from "../../../common/common-select/common-select";
import {DataTable} from "../../../common/data-table/data-table";
import {orgApi} from "../../../../api/common/app/org-api";
import {discountApi} from "../../../../api/common/app/discount-api";
import {customHistory} from "../../../main-route";
import {clipboardUtils} from "../../../utils/clipboard";


export class DiscountListRoute extends React.Component {
    constructor(props) {
        super(props);
        this.seasons = [
            {
                label: () => "Current Season",
                value: ({currentSeason: true})
            }, {
                label: () => "Past Season",
                value: ({pastSeasons: true})
            }, {
                label: () => "All Seasons",
                value: null
            }
        ];
        this.state = {
            org: null,
            kw: "",
            orgs: [],
            season: this.seasons[0],
            qty: {},
        };

        orgApi.getBriefs().then(orgs => this.setState({orgs}))
    };


    copyDiscountCode = (e, code) => {
        e.preventDefault();
        e.stopPropagation();
        clipboardUtils.copy(code)
    };
    changeSeason = (ss) => {
        if (ss.action) {
            ss.action(ss);
        } else {
            this.setState({
                season: ss,
            });
        }
    };

    render() {
        let {org, kw, season, orgs, qty} = this.state;
        let columns = [
            {
                label: "Discount Name",
                cellDisplay: (discount) => discount.name,
                sortKey: "name"
            },
            {
                label: "Discount Code",
                cellDisplay: (discount) => (
                    discount.discount_code ? (
                        <div className="discount-generic">
                            <span className="code-text">{discount.discount_code}&nbsp;</span>

                            {discount.discount_code.indexOf(" Codes") < 0 && (
                                <a onClick={(e) => this.copyDiscountCode(e, discount.discount_code)}>copy</a>
                            )}
                        </div>
                    ) : (
                        <div className="discount-unique">
                            Individual codes
                            <span onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}>
                                <input
                                    type="number"
                                    value={qty[discount.id]}
                                    placeholder="Qty"
                                    onChange={(e) => this.setState({
                                        qty: {[discount.id]: e.target.value}
                                    })}
                                />
                                <a className={`${(_.isEmpty(qty[discount.id]) || qty[discount.id] <= 0) ? "disabled" : ""}`}
                                   onClick={() => qty[discount.id] && qty[discount.id] > 0 &&
                                       discountApi.downloadIndividualDiscountCodes(discount.id, qty[discount.id])
                                   }
                                >download</a>
                            </span>
                        </div>
                    )
                ),
                sortKey: "discount_code"
            },
            {
                label: "Outings",
                cellDisplay: (discount) => discount.active_outings,
                sortable: true,
                sortKey: "active_outings"
            },
            {
                label: "Groups",
                cellDisplay: (discount) => discount.groups,
                sortable: true,
                sortKey: "groups"
            },
            {
                label: "Organization",
                cellDisplay: (discount) => discount.organization.name,
                sortable: true,
                sortKey: "organization"
            },
            {
                label: "Owner",
                cellDisplay: (discount) => discount.owner.name,
                sortable: true,
                sortKey: "owner"
            }
        ];
        const api = (params) => {
            return discountApi.getDiscountOverviews(params).then((result) => ({
                rows: result.overviews,
                total: result.total
            }));
        };
        return (
            <InitTitle title="Discount List">
                <div className="discount-list-route">
                    <div className="route-header">
                        <p className="title">
                            Discounts
                        </p>
                        <button className="to-add-discount"
                                onClick={() => customHistory.push("/discount-new")}
                        >
                            Add Discount
                        </button>
                    </div>
                    <div className="route-body">
                        <div className="action-panel">
                            <InputSearch
                                className="search-discount"
                                onSearch={kw => this.setState({kw})}
                            />
                            <SelectWithSearch
                                className="select-org"
                                placeholder="All Organizations"
                                list={orgs}
                                value={org}
                                displayAs={(org) => org.name}
                                onPick={org => this.setState({org})}
                            />
                            <CommonSelect
                                className={`select-season`}
                                onChange={val => this.changeSeason(val)}
                                list={this.seasons}
                                displayAs={ss => {
                                    return ss.label();
                                }}
                                value={season || ""}
                                compare={(target, value) => _.isEqual(target, value)}
                            />
                        </div>
                        <div className="table-wrap">
                            <DataTable
                                filter={{
                                    keyword: kw,
                                    orgID: org ? org.id : null,
                                    season: season ? season.getValue ? season.getValue() : season.value : null
                                }}
                                api={api}
                                columns={columns}
                                className="discount-table"
                                rowLinkTo={discount => "/discount/" + discount.id + "/details"}
                                pageSize={50}
                            />
                        </div>
                    </div>
                </div>
            </InitTitle>
        );
    }
}


