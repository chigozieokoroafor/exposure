import { Router } from "express";
import { UploadMenuController } from "./upload";

export const contentManagerRouter = Router()

contentManagerRouter.post("/create", UploadMenuController)

