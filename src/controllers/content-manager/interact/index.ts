import { Router } from "express";
import { MTNMenuController } from "./mtn/menu.index";


export const interactionRouter = Router()

interactionRouter.post("/mtn", MTNMenuController)

