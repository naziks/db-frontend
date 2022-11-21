import type {ApiRequest, ApiSuccess} from "../types";

export interface ApiSuccessGet<T> extends ApiSuccess {
    records: Array<T>
}

interface ApiGetRequest {

}