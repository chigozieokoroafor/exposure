import { Request, Response, NextFunction } from "express";
import { InternalError } from "../../../util/errorHandler";
import { success } from "../../../util/statusCodes";

export async function SubscriptionWebhookController(req: Request, res: Response, next: NextFunction) {
    try {

        console.log("======Body here=====> ")
        console.dir(req.body, { depth: 12 })
        console.log("======Body here=====> ", new Date())

        success(res, {}, "Received")

    } catch (error) {
        next(new InternalError(error))
    }
}