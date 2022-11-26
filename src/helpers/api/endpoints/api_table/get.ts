import {
    ApiRequest,
    ApiRequestMethod,
    ApiRequestDataBase, ApiSuccess, ApiSuccessBase
} from "@/helpers/api/types";
import {makeRequest} from "@/helpers/api/core/requester";

export interface ApiTableGetRequestData extends ApiRequestDataBase {
    table: string
    limit?: number
    page?: number
}

// export interface AutoCompleteRequest{
//     method: ApiRequestMethod.GET
//     path: "/autocomplete"
// }

export type ApiTableGetResponse = {
    rows: object[]
    page: number
    per_page: number
    total_count: number
    total_pages: number
}

export class ApiTableGetRequest implements ApiRequest<ApiTableGetRequestData> {
    method = ApiRequestMethod.GET
    path = '/autocomplete/:table'
    params: ApiTableGetRequestData

    constructor(table: string, params: ApiTableGetRequestData) {
        this.path = `/api_table/${table}`
        this.params = params;
    }
}


export const makeApiTableGetRequest = (table: string, params?: ApiTableGetRequestData) => {
    // use AutoCompleteRequest and add data member
    if (params === undefined) {
        params = {
            limit: 20,
            page: 1,
        } as ApiTableGetRequestData;
    }

    let request = new ApiTableGetRequest(table, params);

    return makeRequest<ApiTableGetRequestData, ApiTableGetResponse>(request);
}


