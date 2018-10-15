import {urlUtils} from "../../../react/utils/url-utils";
import {appApi} from "../app-config";


export const eventApi = {
    getEventsOverview: ({skip, take, filter, sort}) => {
        console.log("dasdsa");
        let {keyword, orgID, season} = filter || {};
        let {orderBy, orderAsc} = sort || {};
        let params = {skip, take, filter: keyword || null, orgID, orderBy, orderAsc, ...season};
        let paramsURL = urlUtils.buildParams(params);
        return appApi.get("/manage/event/overviews" + paramsURL)
    },
    upsertEvent(draftEvent) {
        return appApi.put(`/manage/event`, draftEvent);
    },
    getEvent: eventID => appApi.get("/manage/event/" + eventID),
    getEventOverview: eventID => appApi.get("/manage/event/" + eventID+"/overview"),
    disableEnableEvent(eventID, status) {
        return appApi.put(`/manage/event/${eventID}/disable/${status}`)
    },
    updateVenueMapToExistingEvent(eventId, venueMapId) {
        return appApi.put(`/manage/event/update/${eventId}/${venueMapId}`);
    },
    // canDelete: venueID => appApi.get("/manage/venue/can-delete/" + venueID),
    deleteEvent: (eventID) => appApi.delete(`/manage/event/${eventID}`),
    // canDeleteVenueMap: venueMapId => appApi.get(`/manage/venue/venue-map/can-delete/${venueMapId}`),
    // upsertVenue: (venue, orgID) => appApi.put(`/manage/organization/${orgID}/venue`, venue)
};
