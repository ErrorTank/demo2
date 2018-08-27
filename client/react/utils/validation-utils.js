import {countries} from "../common/list-countries";


let required = val => !!val;

let zipCodeMatch = country => {
    let validator = countries.find(each => each.country.value === country).country.validation.zip;
    return zip_code => validator.test(zip_code);
};

export const validationUtils = {
    required,
    zipCodeMatch
};
