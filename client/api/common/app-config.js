
import {apiFactory} from "../api-factory/api-config";

export const token = "J_ZegvbzGMur9nPqfMgiGmPrqOfzSfuKBGiRdwsKPJyiZ9ECsUDuhlc-nlLlV0RgYFXB49OFzMnZQg8Ij95wQGAdDPeMxDhNZYr2eLgHa5QgTkOgptNH9XEQZU6a5TwlleW6vkB91A7UJMmCn4Mdc55WInNxHv5T1kxy-2-GdyJHSVG5abpLmqpGejE1BSQKnRf1oAzo4341m1PVPL_u4CirZMh9ffBjIUxyja0LjdIHcElAbeePb_PoHZiKLszfjJs6HzOrFFaBP8hpFJM6_Onymxef4R1KL5xqu_HqOwRDz-NlA6s5ItMUJFIKJTDdg8H7y5CCN1AIzSdF6RiU0_PAvbcxfBfTAznRQsdbKS3WrhwNBdS5GU8e7Ly_lvnTqsUOP8hKdbn0I2Z4bMTkR_l2LFw6ZOy-7buwDxd7SzJD6qBezz6hFkI4FO0bsqeT45403WEnHxCk5sIwvPDG_Q";

const appApiConfig = {
    hostURL: "https://latest.staging.groupmatics.co/api",
    headers: [
        {key: "Access-Control-Allow-Origin", content: "https://latest.staging.groupmatics.co"},
        {key: "Authorization", content: "Bearer "+token}
    ]
};

export const appApi = apiFactory.createApi(appApiConfig);
