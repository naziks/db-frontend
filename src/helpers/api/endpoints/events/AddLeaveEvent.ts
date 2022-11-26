import {
    ApiRequest,
    ApiRequestMethod,
    ApiRequestDataBase, ApiSuccess, ApiSuccessBase
} from "@/helpers/api/types";
import {makeRequest} from "@/helpers/api/core/requester";

export interface AddLeaveEventGetRequestData extends ApiRequestDataBase {
    alcoholic_id: any
    inspector_id: any
}

// export interface AutoCompleteRequest{
//     method: ApiRequestMethod.GET
//     path: "/autocomplete"
// }

export class AddLeaveEventGetRequest implements ApiRequest<AddLeaveEventGetRequestData> {
    method = ApiRequestMethod.POST
    path = '/act/leave'
    data: AddLeaveEventGetRequestData

    constructor(data: AddLeaveEventGetRequestData) {
        this.data = data;
        console.log(data);
    }
}

export const makeAddLeaveEventGetRequest = (data: AddLeaveEventGetRequestData) => {
    let request = new AddLeaveEventGetRequest(data);
    return makeRequest<AddLeaveEventGetRequestData, object>(request);
}


