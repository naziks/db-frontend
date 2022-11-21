import {ApiError, ApiRequest, ApiRequestData, ApiRequestMethod, ApiResponse, ApiSuccess} from "@/helpers/api/types";
import axios, {AxiosPromise} from "axios";

const processPromise = async <R extends ApiSuccess>(
    promise: AxiosPromise<ApiResponse<R>>
): Promise<ApiResponse<R>> => {
    try {
        return (await promise).data;
    } catch (e: any) {
        return ({
            success: false,
            error: {
                code: -1,
                message: e.message
            },
            data: null
        } as ApiResponse<R>);
    }
}

const generateUrl = (path: string) => {
    console.log(import.meta)
    return import.meta.env.VITE_APP_API_URL + path;
}

const makeGet = <Q extends ApiRequestData, R extends ApiSuccess>(request: ApiRequest<Q>) => {
    let query_params = '';
    if (!!request.params) {
        query_params = '?' + Object.keys(request.params)
            .map(key => `${key}=${encodeURIComponent((request.params || {})[key] || '')}`)
            .join('&');
    }

    return processPromise<R>(axios.get(generateUrl(request.path) + query_params));
}

const makePost = <Q extends ApiRequestData, R extends ApiSuccess>(request: ApiRequest<Q>) => {
    return processPromise<R>(axios.post(generateUrl(request.path), request.data));
}

const makePut = async <Q extends ApiRequestData, R extends ApiSuccess>(request: ApiRequest<Q>) => {
    return processPromise<R>(axios.put(generateUrl(request.path), request.data));
}

const makeDelete = async <Q extends ApiRequestData, R extends ApiSuccess>(request: ApiRequest<Q>) => {
    return processPromise<R>(axios.delete(generateUrl((request.path))));
}

const mapMethod = <Q extends ApiRequestData, R extends ApiSuccess>(method: ApiRequestMethod) => {
    switch (method) {
        case ApiRequestMethod.GET:
            return makeGet<Q,R>;
        case ApiRequestMethod.POST:
            return makePost<Q,R>;
        case ApiRequestMethod.PUT:
            return makePut<Q,R>;
        case ApiRequestMethod.DELETE:
            return makeDelete<Q,R>;
    }
}

export const makeRequest = async <Q extends ApiRequestData, R extends ApiSuccess>(request: ApiRequest<Q>): Promise<ApiResponse<R>> => {
    let caller = mapMethod<Q,R>(request.method);
    return caller(request);
}