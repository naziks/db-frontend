import {
    ApiRequest,
    ApiRequestMethod,
    ApiRequestDataBase, ApiSuccess, ApiSuccessBase
} from "@/helpers/api/types";
import {makeRequest} from "@/helpers/api/core/requester";

export interface AddFaintEventGetRequestData extends ApiRequestDataBase {
    alcoholic_id: any
}

// export interface AutoCompleteRequest{
//     method: ApiRequestMethod.GET
//     path: "/autocomplete"
// }

export class AddFaintEventGetRequest implements ApiRequest<AddFaintEventGetRequestData> {
    method = ApiRequestMethod.POST
    path = '/act/faint'
    data: AddFaintEventGetRequestData

    constructor(data: AddFaintEventGetRequestData) {
        this.data = data;
    }
}

export const makeAddFaintEventGetRequest = (data: AddFaintEventGetRequestData) => {
    let request = new AddFaintEventGetRequest(data);
    return makeRequest<AddFaintEventGetRequestData, object>(request);
}


