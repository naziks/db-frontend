import {
    ApiRequest,
    ApiRequestMethod,
    ApiRequestDataBase, ApiSuccess, ApiSuccessBase
} from "@/helpers/api/types";
import {makeRequest} from "@/helpers/api/core/requester";

export interface AddJoinEventGetRequestData extends ApiRequestDataBase {
    alcoholic_id: any
    inspector_id: any
}

// export interface AutoCompleteRequest{
//     method: ApiRequestMethod.GET
//     path: "/autocomplete"
// }

export class AddJoinEventGetRequest implements ApiRequest<AddJoinEventGetRequestData> {
    method = ApiRequestMethod.POST
    path = '/act/join'
    data: AddJoinEventGetRequestData

    constructor(data: AddJoinEventGetRequestData) {
        this.data = data;
        console.log(data);
    }
}

export const makeAddJoinEventGetRequest = (data: AddJoinEventGetRequestData) => {
    let request = new AddJoinEventGetRequest(data);
    return makeRequest<AddJoinEventGetRequestData, object>(request);
}


