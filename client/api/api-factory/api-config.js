import {sendRequest} from "./ajax-config";
import _ from "lodash";

export const apiFactory = {
    createApi: ({hostURL, headers, beforeSend}) => {
        const withPayload = method => (url, data) => {
            return sendRequest({
                url: hostURL + url,
                data,
                type: method,
                beforeSend,
                headers
            });
        };
        const withoutPayload = method => url => {
            return sendRequest({
                url: hostURL + url,
                type: method,
                beforeSend,
                headers
            });
        };

        return {
            get: withoutPayload("GET"),
            post: withPayload("POST"),
            put: withPayload("PUT"),
            delete: withoutPayload("DELETE"),
            postMultipart: (url, data) => {
                let formData = new FormData();
                _.forIn(data, (value, key)=>{
                    if (value != null) {
                        formData.append(key, value);
                    }
                });

                return new Promise((resolve, reject)=>{
                    $.ajax({
                        url,
                        type: 'POST',
                        beforeSend,
                        data: formData,
                        cache: false,
                        dataType: 'json',
                        processData: false, // Don't process the files
                        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                        success: (data) => {
                            resolve(data);
                        },
                        error: (resp, status, error) => {
                            reject(error);
                        }
                    });
                });
            },
        }
    }
};
