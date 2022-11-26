import {
    ApiRequest,
    ApiRequestMethod,
    ApiRequestDataBase, ApiSuccess, ApiSuccessBase
} from "@/helpers/api/types";
import {makeRequest} from "@/helpers/api/core/requester";

export interface AddBedChangeEventGetRequestData extends ApiRequestDataBase {
    alcoholic_id: any
    new_bed_id: any
}

export class AddBedChangeEventGetRequest implements ApiRequest<AddBedChangeEventGetRequestData> {
    method = ApiRequestMethod.POST
    path = '/act/bed_change'
    data: AddBedChangeEventGetRequestData

    constructor(data: AddBedChangeEventGetRequestData) {
        this.data = data;
    }
}

export const makeAddBedChangeEventGetRequest = (data: AddBedChangeEventGetRequestData) => {
    let request = new AddBedChangeEventGetRequest(data);
    return makeRequest<AddBedChangeEventGetRequestData, object>(request);
}


