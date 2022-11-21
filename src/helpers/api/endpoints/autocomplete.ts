import {
    ApiRequest,
    ApiRequestMethod,
    ApiRequestDataBase, ApiSuccess, ApiSuccessBase
} from "@/helpers/api/types";
import {makeRequest} from "@/helpers/api/core/requester";

export interface AutoCompleteRequestData extends ApiRequestDataBase {
    table: string
    search_in: string[]
    search_text: string
    return_column: string
}

// export interface AutoCompleteRequest{
//     method: ApiRequestMethod.GET
//     path: "/autocomplete"
// }

export type AutoCompleteResponse = object[]

export class AutoCompleteRequest implements ApiRequest<AutoCompleteRequestData> {
    method = ApiRequestMethod.POST
    path = '/autocomplete'
    data: AutoCompleteRequestData

    constructor(data: AutoCompleteRequestData) {
        this.data = data;
        this.data.search_text = `${ this.data.search_text || ''}`
    }
}



export const makeAutoCompleteRequest = (data: AutoCompleteRequestData) => {
    // use AutoCompleteRequest and add data member
    let request = new AutoCompleteRequest(data);

    return makeRequest<AutoCompleteRequestData, AutoCompleteResponse>(request);
}


