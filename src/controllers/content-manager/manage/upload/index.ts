import { NextFunction, Response, Request } from "express";
import { InternalError } from "../../../../util/errorHandler";
import { createMenuRecord, validateUploadDTO } from "./util";
import { success } from "../../../../util/statusCodes";

export async function UploadMenuController(req: Request, res: Response, next: NextFunction) {
    try {

        const dto = await validateUploadDTO(req.body)

        await createMenuRecord(dto)

        success(res, {},"Successfully created.")

    } catch (error) {
        next(new InternalError(error))
    }
}