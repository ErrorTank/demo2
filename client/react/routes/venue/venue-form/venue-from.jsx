import React from "react";
import {CommonInput} from "../../../common/common-input/common-input";
import {CommonSelect} from "../../../common/common-select/common-select";
import {countries as ListCountries} from "../../../common/list-countries";
import {timezones} from "../../../common/timezone";
import {VenueEditMap} from "../venue-edit-map/venue-edit-map";



export class VenueForm extends React.Component{
    constructor(props){
        super(props);
    };

    handleChange = (obj) => {
        let {info, onChange} = this.props;
        onChange({info: {...info, ...obj}});
    };

    handleChangeMap = obj => {
        let {onChange} = this.props;
        onChange({venueMaps: obj});
    };



    render(){

        let {info, onDelete, maps, deleteVenueMap} = this.props;
        let {name, address ,timezone, facebook_place_id} = info || {};
        let {address1, address2, city, country, state, zip_code} = address;
        let updateAddress = obj => {
            this.handleChange({address: {...address, ...obj}})
        };
        const countries = ListCountries.slice(0,2).map(c => c.country);

        let getStatesByCountry = (country) => {
            if(!country) {
                return [];
            }

            return ListCountries.find(c => c.country.value === country).states;
        };
        console.log(name)
        return(
            <div className="venue-form">
                <div className="left-panel">
                    <CommonInput
                        className={`venue-name venue-form-section`}
                        type="text"
                        onChange={name => this.handleChange({name})}
                        value={name || ""}
                        label="Venue Name"
                    />
                    <CommonInput
                        className={`venue-add-1 venue-form-section`}
                        type="text"
                        onChange={address1 => updateAddress({address1})}
                        value={address1 || ""}
                        label="Address 1"
                    />
                    <CommonInput
                        className={`venue-add-2 venue-form-section`}
                        type="text"
                        onChange={address2 => updateAddress({address2})}
                        value={address2 || ""}
                        label="Address 2"
                    />
                    <CommonInput
                        className={`city venue-form-section`}
                        type="text"
                        onChange={city => updateAddress({city})}
                        value={city || ""}
                        label="City"
                    />
                    <CommonSelect
                        className={`country venue-form-section`}
                        onChange={val => updateAddress({country: val})}
                        list={countries.map(country => country.value)}
                        displayAs={val => {
                            return countries.find(each => each.value === val).name
                        }}
                        value={country || ""}
                        label="Country"
                        compare={(target, value) => target === value}
                    />
                    <div className="venue-form-section">
                        <div className="p1">
                            <CommonSelect
                                className={`state venue-form-section`}
                                onChange={val => updateAddress({state: val})}
                                list={getStatesByCountry(country).map(s => s.value)}
                                displayAs={state => state}
                                value={state || ""}
                                label="State/Province"
                                compare={(target, value) => target === value}
                            />
                        </div>
                        <div className="p2">
                            <CommonInput
                                className={`zip-code venue-form-section`}
                                type="text"
                                onChange={zip => updateAddress({zip_code: zip})}
                                value={zip_code || ""}
                                label="Postal Code"
                            />
                        </div>
                    </div>
                    <CommonSelect
                        className={`time-zone venue-form-section`}
                        onChange={val => this.handleChange({timezone: val})}
                        list={timezones.map(i => i.value)}
                        displayAs={val => {
                            return timezones.find(each => each.value === val).text
                        }}
                        value={timezone || ""}
                        label="Timezone"
                        compare={(target, value) => {
                            return target === value
                        }}
                    />
                    <CommonInput
                        className={`fb-id venue-form-section`}
                        type="text"
                        onChange={facebook_place_id => this.handleChange({facebook_place_id})}
                        value={facebook_place_id || ""}
                        label="Facebook Place ID"
                    />
                    <div className="del-wrap venue-form-section"
                         onClick={onDelete}
                    >
                        <i className="fas fa-trash-alt"/>
                        &nbsp;
                        <span>
                           Delete this venue
                        </span>
                    </div>
                </div>
                <div className="right-panel">
                    <VenueEditMap
                        maps={maps}
                        onChange={this.handleChangeMap}
                        deleteVenueMap={deleteVenueMap}
                    />
                </div>
            </div>
        );
    }
}
