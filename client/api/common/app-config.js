
import {apiFactory} from "../api-factory/api-config";

const token = "R7qB8iw6XbQ_3_0CJgD_9BnoVkny1wu9TRpYfU57nAF_OfwxPAIMgj0FBLngHGTaQ4e2VVNiT4t0YAJ3i0EL4EduWrcs-rSJ9eVOIPlkqj_Zf463B8cYrQGY3APA5J52D9LTRlNmsA0LCaeqn96EdZTXkGfX6hi7jbj8Fp_C4U-txZWqfa-6_nE2rHW4sFGscDJAqVKpgI63g6k-5FtTOwLUkovqwxeEmaTnGYkteBNTiSedY3u_cTk-wnSLwcSU7-MtjlqNN5JWPIAB3HcoNiKId2Em7Wi8xYfJ3qPYO-MwBV4J_pgU2N3mN3_jwsIJO36lQJu9uqqhvIn6rMCOeVdNU6zS153GCX2TD8J5T0iPaMOQFxh8G7aIT-KV_g5smlQ2gQTGdBW4bgY_uQKpREPHukuh5S4MD8orP8Q3fKlHUMYlDFa4zT2K91cE-HXQvJT50rYNhrZq4Zij-vFEVQ";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
