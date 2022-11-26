import {
    ApiRequest,
    ApiRequestMethod
} from "@/helpers/api/types";
import {makeRequest} from "@/helpers/api/core/requester";

export type StatsResponse = object[]

export class StatsRequest implements ApiRequest<null> {
    method = ApiRequestMethod.GET
    path = '/stats'
}



export const makeStatsRequest = () => {
    // useStatsRequest and add data member
    let request = new StatsRequest();

    return makeRequest<null, StatsResponse>(request);
}


