
import {apiFactory} from "../api-factory/api-config";

const token = "qTCmm1FCPDQB9Ejy1XLE0K9CFgKLbHnJ1ZhSW1NMImdKzdGEA-pST3nc0xXqNQNCL2JgHOfDaAjRJQUIpdVIeaUCuPOW7jO8WXHIpUThWi6hY6EbZWxPUOBIuHfLBDWa71LfMvof6kOStGR6k8xu-qt92HNwm8IKZ0tzNmXIePAHl5E2lY-4CCje8d89wimMHXnhhELT8uw73Q4pXV-aokxti-4BmmziBEFsccsJYLHzt0Keu9-RXtaaRmoYGe8KEzj-ahM2xOVLUeSVqiUM-oAUgxYprgR_Dk8Ng8B3Y-4-FWyC9RAD5MI5vUO0m6Jrrl1t4VoIVttZsgXXGGnw7ORyRNFaXYI9zFxaJLY0o88SaRgHmMEHaNF-zIFbuy5QPKWf2TWErkZcM8X2guumUKJa-JGyHbs0nRQ3weD2169T-xpNidazlV4MnMRtXki635qpHjN_gltV16_-kwn2OA";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
