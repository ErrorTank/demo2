import {countries} from "../common/list-countries";


let required = val => !!val;

let zipCodeMatch = country => {
    let validator = countries.find(each => each.country.value === country);
    validator = validator ? validator.country.validation.zip : null;
    return zip_code => validator ? validator.test(zip_code) : false;
};

let notEmpty = (arr = []) => {
    return arr.length !== 0
};

export const validationUtils = {
    required,
    zipCodeMatch,
    notEmpty
};
