/** Failed Request details */
export interface ApiError {
    code: number
    message: string
}

/** Success Request details */
export interface ApiSuccess {}

enum ApiRequestMethod{
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

/** Request options */
export interface ApiRequest<T extends ApiSuccess> {
    method: ApiRequestMethod
    data: ApiResponse<T>
}

export interface ApiError {
    code: number
    message: string
}

export interface ApiResponse<T extends ApiSuccess> {
    /** Request status: Success or Fail  **/
    ok: boolean
    error: ApiError | null
    data: T | null
}