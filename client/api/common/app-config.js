
import {apiFactory} from "../api-factory/api-config";

const token = "ylj3aA8-yJHM662kokxR2Mn2K8Xi0iVJ5n6002Ow-RjIvTRSabm88BK3YB8I2PJgFfok0vBR13a3sQUFEGOUr4esRLR_REKk77es-qghNx82CKPNEpDadNGviV-M8XUurHJybAPwrZhyu3E7zyZg1eQMza4TWblaY4WKh598in3qAs0ci7Prkuemayq2tpA3gIRhqlUoei6NEBJv_kEJHB2IORxYl_VZkP0nH2OCgQnp7DIgC4jjJ7_utWIqTXIkXhlHYt_lyvCMQhdo1Vaela4ym5usGRWd2GbLjN0MJezxzLJmLXRB5wkSFJ5pwIz9JiwWs0OSiW8cFqlsRWhejbtNjVEjRXTvnKbFMaqsiCBYicYEl7_-bhUIl1s2YhV2qaykNBFn_Peuuad8ERGQeQTmDjjfunb_igKRYvsJpYxe-dsaLJ3K0_IBE_uD50k6Rize-5TaEIRU8ZdOGZlZJA";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
