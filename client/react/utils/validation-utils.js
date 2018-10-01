import {countries} from "../common/list-countries";
import moment from "moment"

let required = val => !!val;

let zipCodeMatch = country => {
    let validator = countries.find(each => each.country.value === country);
    validator = validator ? validator.country.validation.zip : null;
    return zip_code => validator ? validator.test(zip_code) : false;
};

let notEmpty = (arr = []) => {
    return arr.length !== 0
};

let isDate = str => {
    if (!str) {
        return false;
    }
    if (RegExp("^\\d{2}/\\d{2}/\\d{4}$", "g").test(str)) {
        return moment(new Date(str))._isValid;
    }
    return false
};

let isTime = str => {
    if (!str) {
        return false;
    }
    if (RegExp("^\\d{2}:\\d{2} (am|pm)$", "g").test(str)) {
        return moment(str.replace(":","").replace(" ",""), "hhmma")._isValid;
    }
    return false
};

export const validationUtils = {
    required,
    zipCodeMatch,
    notEmpty,
    isDate,
    isTime
};
