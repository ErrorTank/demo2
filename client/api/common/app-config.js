
import {apiFactory} from "../api-factory/api-config";

export const token = "tJYSKzDZlWlObtg3yRAYxsVxRfLG7ldscoyGpfQfxqD05Kb-FeWSxwlC07Gi4WU6xRPrIv7XDhGTcrw7Cc3uaEXxHmE80-yrPBosvKJUVvIdJvHUuRVK5W-4GV-f6g_kb_ZWCEVXM-dhxvTlXXXHLNCMe2SrC1VTPh-UDjXCMbfwT2aeL3992HLA3FhJXhWXqGObJaNo9tb4YupxJ4tch_JBVD95Oo0CwsUMqH6mrXEBaqzB-OcE7mcvZDBCcfCRcgWw6NjDYl6hazE4N0YsqvcuWY1_00CUQU1XDIheGKf0dGKcjHI_2q8rOE-_RogKkU_pghJsoxrkfXYvTrEOkrYQKvrAkyc4T-nkHiNlh8bRxVDjt7UC95EePT6GEmRmCeF2I8q2YBJ8kHl3nVmVp5c0FelFtR4kpDV4a9VF8fReatYhjzHx_7enSXFe5eyXEJHGAILmlEiq_0U5Db5NDA";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
