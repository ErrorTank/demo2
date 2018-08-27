
import {apiFactory} from "../api-factory/api-config";

const token = "kyGtJi1teSCdPFXnjVS9sHLtkLbhqsAikDxIvkRRUsVUHmqf0JrR26-QqNPWgxXCB6ZG1LeCfw4xeAzITuGZGnqnvi0hWyJMjlCPuXEqVW4G5M7CYS0iQyUnv8b2P93mrxd2cJbaNHsYfvCO4x9Uu8N9u5SsHoawl-9wsPOLMt8LiSliCVyrbZ_y6cMjWvSW1nC4pN1TalvPmbiwwF00FnocHteNAkQsuysh_odRkcZ4PxN2z4Jx292cCbKF-A18Y05RuPI0RIhdeyVP7rwkgXdVHjHUILyPrCPCqqoapDbR7LMmzLF_idptWO9vdWQAdtmrH53zacwy05Q28VUbg1OSQe0LikUxCrk8WL95NOhrcyvroWH1ItXTD9vs5RtQFWOtNDcATrLxFlpCEEHpf2AtysYAw3cTpafbfuEIjNFCdsHxuzlu-C193fq0wJNMntxDrE3oa_Itekg721xkxQ";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
