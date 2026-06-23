import {Router} from "express"
import { interactionRouter } from "./interact"
import { contentManagerRouter } from "./manage"


export const  contentRouter = Router()

contentRouter.use("/interact", interactionRouter)
contentRouter.use("/manager", contentManagerRouter)


