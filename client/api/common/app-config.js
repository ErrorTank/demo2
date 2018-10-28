
import {apiFactory} from "../api-factory/api-config";

export const token = "4BZR-aAH9KFWDwad0KrlbhDAkxGrffNHL72AotX8kxyzxmv5A5ZWDtekKRupsCXYjbFpg2e71pUcUl9lVz7wmQlspMg5QLWPQ_Vnm5jSWPepIMIq7OFjxDY_tjOlhYB40ZpddpehUgFr1bx8bHEF8QdQ18U21lUZEznvoHSQ7e7Fz-FiWQwShiIsbQYU9FuCCYbZ6465WIsNgeho8CWFPkkMRq5Y9-YCj6w4hr83-k4-LxkjNJDqEprKNjIHGcUqeFmRNEM_DXHmc3fyJUd__5gUDjmexHypJWcLrasr32eUOTZ4vSNEJq2NopnLT_Gv7tmAKJhJkm8vOlJcH6naKQ2u4ZznkTXtpkqc64e-apIGfWZ2bpqjgywpzs5ehoL-1dFt4PEYCR2eWYq3HORc0m0ABX5J0DnzDekWk2CB2S5ggPLsUZcviHuKWizyPO_p52Fh6IdwyQ_XhgKYBU6naQ";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
