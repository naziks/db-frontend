import type {ApiRequest, ApiSuccess} from "../types.ts";

export interface ApiSuccessGet<T> extends ApiSuccess {
    records: Array<T>
}

interface ApiGetRequest {

}