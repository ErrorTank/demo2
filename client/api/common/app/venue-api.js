import {urlUtils} from "../../../react/utils/url-utils";
import {appApi} from "../app-config";


export const venueApi = {
    getVenuesOverview: ({skip, take, filter, sort}) => {
        let {keyword, orgID} = filter || {};
        let {orderBy, orderAsc} = sort || {};
        let params = {skip, take, filter: keyword || null, orgID, orderBy, orderAsc};
        let paramsURL = urlUtils.buildParams(params);
        console.log(paramsURL)
        return appApi.get("/manage/venue/overviews" + paramsURL)
    },
    getVenueInfo: venueID => appApi.get("/manage/venue/" + venueID),
    canDelete: venueID => appApi.get("/manage/venue/can-delete/" + venueID),
    deleteVenue: (venueID, orgID) => appApi.delete(`/manage/organization/${orgID}/venue/${venueID}`),
    canDeleteVenueMap: venueMapId => appApi.get(`/manage/venue/venue-map/can-delete/${venueMapId}`),
    upsertVenue: (venue, orgID) => appApi.put(`/manage/organization/${orgID}/venue`, venue),
    upsertVenueMaps(organizationId, venueId, venueMap) {
        return appApi.put(`/manage/organization/${organizationId}/venue/${venueId}/map`, venueMap);
    },
};
