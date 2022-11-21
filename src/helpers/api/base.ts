// create base api response object typescript

import axios from "axios";
import {
    ApiResponse,
    ApiRequest,
    ApiSuccess,
    ApiError
} from "@/helpers/api/types";

const makeApiRequest = async <T extends ApiSuccess | string | number | boolean>(url: string, request: ApiRequest<T>): Promise<ApiResponse<T>> => {
    // axios request
    const response = await axios({
        method: request.method,
        url,
        data: request.data
    })

    return response.data
}