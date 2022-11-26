import {
    ApiRequest,
    ApiRequestMethod,
    ApiRequestDataBase, ApiSuccess, ApiSuccessBase
} from "@/helpers/api/types";
import {makeRequest} from "@/helpers/api/core/requester";

interface AlcoPartyPair {
    alcoholic_id: any
    drink_id: any
}

export interface AddAlcoPartyEventGetRequestData extends ApiRequestDataBase {
    general_id: any
    pairs: AlcoPartyPair[]
}

// export interface AutoCompleteRequest{
//     method: ApiRequestMethod.GET
//     path: "/autocomplete"
// }

export class AddAlcoPartyEventGetRequest implements ApiRequest<AddAlcoPartyEventGetRequestData> {
    method = ApiRequestMethod.POST
    path = '/act/alco_party'
    data: AddAlcoPartyEventGetRequestData

    constructor(data: AddAlcoPartyEventGetRequestData) {
        this.data = data;
    }
}

export const makeAddAlcoPartyEventGetRequest = (data: AddAlcoPartyEventGetRequestData) => {
    let request = new AddAlcoPartyEventGetRequest(data);
    return makeRequest<AddAlcoPartyEventGetRequestData, object>(request);
}


