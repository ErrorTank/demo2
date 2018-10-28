import {appApi} from "../app-config";

export const groupApi = {
  getGroupByOrganization(orgId) {
    return appApi.get(`/manage/group/${orgId}/briefs`)
  },
};
