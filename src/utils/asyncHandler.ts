import { Request, Response } from "express"

export const asyncHandler = (handler: ( request: Request, response: Response) => Promise<void>) => {
    return (request: Request, response: Response) => {
        try {
            return handler(request, response);
        } catch (error) {
            response.send(error);
        }
    }
}