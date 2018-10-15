import {appApi} from "../app-config";


export const orgApi = {
    getBriefs : ()=> {
        return appApi.get("/manage/organization/briefs")
    },
    getVenueMap : (orgID, venueID) => appApi.get(`/manage/organization/${orgID}/venue/${venueID}/map`),
    deleteVenueMap(organizationId, venueId, venueMapID) {
        return appApi.delete(`/manage/organization/${organizationId}/venue/${venueId}/map/${venueMapID}`);
    },
    upsertVenueMap(organizationId, venueId, data) {
        return appApi.put(`/manage/organization/${organizationId}/venue/${venueId}/map`, data);
    },
    bulkUpdateVenueAllEvents(venue, venueMapID) {
        return appApi.put(`/manage/organization/${venue.organization.id}/venue/${venue.id}/map/${venueMapID}/bulk-update`);
    },
    getVenueMaps(organizationId, venueId) {
        return appApi.get(`/manage/organization/${organizationId}/venue/${venueId}/map`);
    },
    getVenues(organizationId) {
        return appApi.get(`/manage/organization/${organizationId}/venues`);
    },
    getOrg(orgID){
        return appApi.get(`/manage/organization/${orgID}`);
    }

};
