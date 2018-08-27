import _ from "lodash"

let compareObjArr = (a1, a2) => {
    if(a1.length !== a2.length){
        return false;
    }
    return a1.filter((each, i) => _.isEqual(each, a2[i])).length === a1.length;
};


export const arrUtils = {
    compareObjArr
};
