
import {apiFactory} from "../api-factory/api-config";

export const token = "-2Mg3f4EW0xyYg8CHV7gPNgMOSMu8a6Q0clvZwVZJ3qoMoRxJHw4vEp1OrxCcSNXRFw3umUPGhaRThW6C1Ygr8RPAU4KRHDOSFaPf35dQgTPhyydYbm1A6QM0spRdkzxlDPClCZgLuDLOHEIvQebUM5jAJDJA_D_etyI_XIcpjH_mq2MJlR-PaL3kaO_E5lRP7LvAt0z5m12Vlc4vCiVbzR1zwb7Oi7Ojm4C0agO60tPSVXJ84ZGhe2AtqzeW9dk6cA_gvGDReM-zpQGHbwSZDwk1Z7gTtZ292K4ZnAfik-nNOXgzwl0nq_BPIPSDiA8-KYyCI0UKzlRBD7QMxt8FdNmTGAKN-OF2XwQ3nY_Zg7Twgm62gKllEMq9t9BA5zr5l9CPy7Xh4dAQYW3hH6IhKiL5mCqVuaRtYByT9lT8E7neAdFCdmyJqXhPSQ8MJZlANaQb7Zy8nmCMZSGeqNopA";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
