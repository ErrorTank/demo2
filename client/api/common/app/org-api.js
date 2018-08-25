import {appApi} from "../app-config";


export const orgApi = {
    getBriefs : ()=> {
        return appApi.get("/manage/organization/briefs")
    },
    getVenueMap : (orgID, venueID) => appApi.get(`/manage/organization/${orgID}/venue/${venueID}/map`),
    deleteVenueMap(organizationId, venueId, venueMapID) {
        return appApi.delete(`/manage/organization/${organizationId}/venue/${venueId}/map/${venueMapID}`);
    },
};
