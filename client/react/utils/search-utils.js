import {stringUtils} from "./str-utils"
let {normalizedStr} = stringUtils;
import _ from "lodash"

export const searchUtils = {
    searchByKeyword: (list, keyword) => {
        return list.filter(each => {
            return normalizedStr(each).includes(normalizedStr(keyword))
        })
    },
    simpleSearch: (list, indexes, keyword) => {
        if(!keyword){
            return list
        }

        return list.filter((each) => {

            for(const key in indexes){
                const indexType = indexes[key];
                const dataProperty = _.get(each, key);

                if(dataProperty){
                    if (indexType === "Number" && dataProperty.toString().toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
                        return true;
                    } else if (indexType === "String" && dataProperty.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
                        return true;
                    } else if (typeof indexType === "function" && indexType(dataProperty, keyword)) {
                        return true;
                    }
                }

            }
            return false
        });

    }
};
