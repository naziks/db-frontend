import {
    ApiRequest,
    ApiRequestMethod,
    ApiRequestDataBase, ApiSuccess, ApiSuccessBase
} from "@/helpers/api/types";
import {makeRequest} from "@/helpers/api/core/requester";

export interface AddEscapeEventGetRequestData extends ApiRequestDataBase {
    alcoholic_id: any
}

// export interface AutoCompleteRequest{
//     method: ApiRequestMethod.GET
//     path: "/autocomplete"
// }

export class AddEscapeEventGetRequest implements ApiRequest<AddEscapeEventGetRequestData> {
    method = ApiRequestMethod.POST
    path = '/act/escape'
    data: AddEscapeEventGetRequestData

    constructor(data: AddEscapeEventGetRequestData) {
        this.data = data;
    }
}

export const makeAddEscapeEventGetRequest = (data: AddEscapeEventGetRequestData) => {
    let request = new AddEscapeEventGetRequest(data);
    return makeRequest<AddEscapeEventGetRequestData, object>(request);
}


