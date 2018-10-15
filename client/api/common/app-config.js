
import {apiFactory} from "../api-factory/api-config";

export const token = "V9jQL6fCQr35b0IEbMwcJyN4Wpiqt0500LDVW0hGULTBkvOXBFdy-r-qzowQh_5_DOm5dz7l_jtCpJizdFE92oz8oG31_T_3oaxHlljku5s_mjVFu4DNrLmnZgz_R4O7CfBAILog88etUjQK-3p-XOkCdTM9hX4Z-aE6LQ7KJn_-QjLhUWzdksQ544WIEccEkiDaW769Gsmf-bRH9tqSvYtlwBINkT3SLKGl5GFDviGaz-HjGrcGK6NWI5By5IpyR2jq4XS5O1I1-Gs861jcdOb0LMTRIRBX9nMod4Jo_yl8VKz-R9keAUplv8G4fSF6-sCYVT-ZSsLM2PU-itlN9J1lSbjUc4cuVLbLgc8mq5silwMjS0Erf19tpa_3gK5zGC6bbQ0_lUw85vdSAG6PxUTG_HyNds070ra5Q7kbqhsOkip6kLsA4NRwZNrxZsA14E_4BMz_BUObC7kmwGzH4A";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
