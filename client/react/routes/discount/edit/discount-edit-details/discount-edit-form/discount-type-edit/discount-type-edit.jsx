import React, {Fragment} from "react";
import {CommonSelect} from "../../../../../../common/common-select/common-select";
import {CommonInput} from "../../../../../../common/common-input/common-input";

const discountAmountTypes = [
    {
        value: 0,
        name: "Percentage",
    },
    {
        value: 1,
        name: "Dollar Amount"
    },
    {
        value: 2,
        name: "Max Price"
    }
];

export class DiscountTypeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    handleChange = obj => {
        this.props.onChange({...this.props.data, ...obj});
    };

    render() {
        let {data} = this.props;
        return (
            <div className="discount-type-edit discount-input">
                {data.$type === "ticket_level_discount" && (
                    <TicketLevelDiscount
                        data={data}
                        discountAmountTypes={discountAmountTypes}
                        onChange={this.handleChange}
                    />
                )}
                {data.$type === "order_level_discount" && (
                    <OrderLevelDiscount
                        data={data}
                        discountAmountTypes={discountAmountTypes.slice(0, 2)}
                        onChange={this.handleChange}
                    />
                )}
            </div>
        );
    }
}

export const TicketLevelDiscount = (props) => {
    let {data, discountAmountTypes, onChange} = props;
    let {required_full_price_tickets, num_discounted_tickets, discount_amount_type, discount_amount, repeat_limit} = data;
    console.log(required_full_price_tickets);
    return (
        <div className="ticket-level-discount">


            <div className="form-label">
                Offer
            </div>
            <div className="form-body">
                If user purchases &nbsp;
                <CommonInput type="text"
                             className="inline-input"
                             value={required_full_price_tickets}
                             onChange={val => onChange({required_full_price_tickets: val})}
                />
                ticket(s), they may get an additional &nbsp;
                <CommonInput type="text"
                             className="inline-input"
                             value={num_discounted_tickets}
                             onChange={val => onChange({num_discounted_tickets: val})}
                />
                ticket(s) at a discount of &nbsp;
                <CommonSelect
                    className="inline-select"
                    value={discount_amount_type}
                    list={discountAmountTypes.map(item => item.value)}
                    displayAs={val => {
                        return discountAmountTypes.find(each => each.value === val).name
                    }}
                    onChange={type => onChange({discount_amount_type: type, discount_amount: null})}
                    compare={(val, item) => val === item}
                />
                {discount_amount_type === 0 && (
                    <Fragment>
                        <CommonInput type="text"
                                     className="inline-input"
                                     value={discount_amount}
                                     onChange={val => onChange({discount_amount: val})}
                        />
                        % per ticket. (leave blank if unlimited)
                    </Fragment>
                )}
                {(discount_amount_type === 1 || discount_amount_type === 2) &&(
                <Fragment>
                    $ &nbsp;
                    <CommonInput type="text"
                                 className="discount_amount inline-input"
                                 value={discount_amount}
                                 onChange={val => onChange({discount_amount: val})}
                    />
                    per ticket
                </Fragment>)
                }
            </div>
            {required_full_price_tickets > 0 && (
                <Fragment>
                    <div className="form-label">
                        How many times can this discount be applied per order?
                    </div>
                    <CommonInput type="text"
                                 className="repeat_limit inline-input"
                                 value={repeat_limit}
                                 onChange={val => onChange({repeat_limit: val})}
                    />
                </Fragment>
            )}

        </div>
    );
};
