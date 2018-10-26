import {appApi, token} from "../app-config";
import {urlUtils} from "../../../react/utils/url-utils";

export const discountApi = {
    getDiscount(discountId) {
        return appApi.get(`/manage/discount/${discountId}`);
    },
    getDiscountOverviews({skip, take, filter, sort}) {
        let {keyword, orgID, season} = filter || {};
        let {orderBy, orderAsc} = sort || {};
        let params = {skip, take, filter: keyword || null, orgID, orderBy, orderAsc, ...season};
        let paramsURL = urlUtils.buildParams(params);
        return appApi.get(`/manage/discount/overviews`+paramsURL);
    },
    reassignDiscount(discountId, reassignToID) {
        return appApi.post(`/manage/discount/${discountId}/creator/${reassignToID}`)
    },
    downloadIndividualDiscountCodes(discountId, qty) {
        return appApi.downloadStream(`/manage/discount/${discountId}/codes/${qty}?access_token=${token}`)
    },
    getOutingIdsByDiscount(discountId) {
        return appApi.get(`/manage/discount/${discountId}/outings`);
    },
    getDiscountAppliedGroup(discountId) {
        return appApi.get(`/manage/discount/${discountId}/groups`);
    },
};
