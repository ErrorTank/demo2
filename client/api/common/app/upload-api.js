import {urlUtils} from "../../../react/utils/url-utils";
import {appApi} from "../app-config";


export const uploadApi = {
    upload: (formData, options) => {
        let size = '?';
        if(options) {
            if (options.width)
                size += 'width=' + options.width;
            if (options.height)
                size += (options.width ? '&' : '') + 'height=' + options.height;
        }

        return appApi.postMultipart(`/manage/file/upload/${size}` , formData)
    }
};
