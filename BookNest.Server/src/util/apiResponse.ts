
interface SuccesResponse<T = any>{
    message: string;
    success: boolean;
    statuscode?: number;
    data?: T;
}

export function createSuccessResponse<T = any>
    (
        message: string, 
        statuscode: number = 200,
        data?: T): SuccesResponse<T> {
    return {
        success: true,
        message,
        statuscode,
        data
    }
}
interface ErrorResponse<T = any>{
    message: string;
    success: boolean;
    statuscode?: number;
    data?: T;
}

export function createErrorResponse<T = any>
    (
        message: string, 
        statuscode: number = 500,
        data?: T): SuccesResponse<T> {
    return {
        success: false,
        message,
        statuscode,
        data
    }
}