
import {appApi} from "../app-config";

export const outingApi = {

    getListByEvent(eventId) {
        return appApi.get(`/manage/event/${eventId}/outings`);
    },

};

