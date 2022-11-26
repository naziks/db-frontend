import {Query} from "@/data/QueryBuffer";
import {makeRequest} from "@/helpers/api/core/requester";
import {ApiRequest, ApiRequestDataBase, ApiRequestMethod, ApiResponse} from "@/helpers/api/types";

const item2url = (item: Query, params: Record<string, any>) => {
    return typeof item.url === 'function'
        ? item.url(params)
        : item.url;
}

export interface QueryTableRequestData extends ApiRequestDataBase {
    alcoholic_id?: string | number
    inspector_id?: string | number
    amount?: string | number
    start_date?: string
    end_date?: string
}

export class QueryTableRequest implements ApiRequest<QueryTableRequestData>{
    method = ApiRequestMethod.GET;
    path: string;
    params: any

    constructor(path: string, params: any) {
        this.path = path;
        this.params = params
    }
}

export const makeQueryTableRequest = (item: Query, params: Record<string, any>) => {
    let url = item2url(item, params);
    let request = new QueryTableRequest(url, params);
    return makeRequest<QueryTableRequestData, any>(request);
}