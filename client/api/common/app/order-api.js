import {appApi, token} from "../app-config";


export const orderApi = {
    getReportEvent : (eID)=> {
        return appApi.downloadStream(`/manage/report/sales/stream?report_filter=${encodeURIComponent(JSON.stringify({event_id:eID}))}&access_token=${token}`);
    },
    getOrdersForEvent(eventId) {
        return appApi.get(`/manage/order/event/${eventId}`);
    },
};
