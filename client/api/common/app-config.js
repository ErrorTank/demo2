
import {apiFactory} from "../api-factory/api-config";

export const token = "-P-MRggC6ubFKbbBJvb9ArcQZyATGXl1VcJJYsOIqJNTuL0bdNzt9WylVnUfJuIbeabgAbjREp_WMxhC5xrWD3_merBz1DkYzD22jLJmS0YxYEtFgSthsljAdp8BN78Rt-u_mKyUO5NjDoIbmkgojYAs8YiTCqRWnefS3QLZo9UCB_A8yBuROr5xSrewAlKVPRCZBY26OWN2FvzUhTyciUmKKlMQ1aglVQqE7uGocdukiJDadxATiNkIbS7QleYYygpMtTYNbXeyPsUwXdGdUTl3CUOvyvvNPMNy0zK8Lwn0Pz1rIc68wNb5mhsGl4i5kgyFP8WPdum7fx75Y6dTrqnMAWnGwKRddnUAmsWLMIewibLt88ht9_7mb9sisF2GwdSIUx8L5yxZ0zcfz6fljtfcEKXHYQV7RO7k9LROLXKQMWESVGRilR1CrYoMIE3UbWWa95-VVTCwXzoRSflyHA";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
