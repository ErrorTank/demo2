
import {appApi} from "../app-config";
import {urlUtils} from "../../../react/utils/url-utils";


export const facebookApi = {
    updateEventOnFb(outing_id, event_id, updatedVenue) {
        let paramsURL = urlUtils.buildParams({outing_id, event_id, updatedVenue});
        return appApi.post("/manage/outing/promote/update-facebook-event"
            + paramsURL)
    }
};
