//////////// REQUESTS ////////////
export enum ApiRequestMethod{
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export interface ApiRequestDataBase {}
export type ApiRequestData = ApiRequestDataBase | string | number | boolean | null

export interface ApiRequest<T extends ApiRequestData> {
    method: ApiRequestMethod
    path: string
    params?: any
    data?: T
}

//////////// RESPONSES ////////////
export interface ApiError {
    code: number
    message: string
    details?: any
}

export interface ApiSuccessBase {}
export type ApiSuccess = ApiSuccessBase | string | number | boolean

export interface ApiResponse<T extends ApiSuccess> {
    /** Request status: Success or Fail  **/
    success: boolean
    error: ApiError | null
    data: T | null
}
