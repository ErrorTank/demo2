
import {apiFactory} from "../api-factory/api-config";

const token = "Yxa1ZfYId919fbPCkJN6MeD5JUD8SlEfgbKQcu_TKgBtz5Fq7Bzc7G1Dn1BMI1NplZOHRYZj2huOLZvnlomZec_o6euTZmmg7eLgdwxFte34CgUXPYHYSLGaVXjRe4JgJO-ZDgaVn3MHGFnvzNW79OLqQg1zomAYCUtYwEOTqzV094pNm8YMjRbrStAHL7eWE1Zb5YPVmMb3Qx6JJZsg-9z3erGFLvUKJc4ssFxgFfhb3QdFH8pEaAQDStptHO2LDhSM7_Rql_uGxWtRbUkGb2TOuB71DLtWBXrJjdsFOKTwd0JWfu9OpAfV3qMFsZ6pS2gGCKku6atQV7EViVooyxy3fD_8Xi2GKWGTPCEzex6NcT3AyOGqc9Z4-hwxibrtn4gDOq602srBKlyVY1EGHc8Y6FLwzWBCWIYNtJekM8ZuYQt17l7wAzp4z91wWzCkVHFkX3Vd3eAVwpwhqXayrA";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
