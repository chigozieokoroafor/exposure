import {Router} from "express"
import { MTNMenuController } from "./content-manager/mtn/menu.index"

export const  base_router = Router()

base_router.post("/mtn", MTNMenuController)

