import {stringUtils} from "./str-utils"
let {normalizedStr} = stringUtils;

export const searchUtils = {
    searchByKeyword: (list, keyword) => {
        return list.filter(each => {
            return normalizedStr(each).includes(normalizedStr(keyword))
        })
    }
};
