
import {apiFactory} from "../api-factory/api-config";

const token = "Ya6RMYvQklXahGjmRTjjz9lZt_xQr-4PpUxgTHxsBLyk_IruZ-AdDLsmRwZYjdyS_VrhaeEwdD8d-UacTZFrrlU30v87e35T88JGVVX1SOlK-eNn5R3pmwXVC073EsmQIy1TzlLuXvsnjZP2bb3lvXit42jsQqx695MLrP8aCTSbiouQZC5zR9PP8qABroZjZtbb-iiyWIOzIMtIFDoCLhAOPF-pt2TwI1kAVTZ-ltn8uWvGx92FY0MXim4dMXhkxtvEw0t_RhiZp3ao34eX2Gd9v0fvx0_45i9E2nFMXK0NKYQdXr3FgA5ZreWKERxZ0MHBsBzhJL-7iI0gp-6wm49XKXjuCRP0TPKmcKXIKqYHnQYqiE9cto1N4Kh5r80nNOPRa6d4GDrFTAQ6VcZ76RikHMOxUKD3Im9mOO4-eZazJCyDq1soLB6ZnGzQfzzVjlW-jeeRKV70I8vg4ujSXA";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
