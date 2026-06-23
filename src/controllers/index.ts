import {Router} from "express"
import { contentRouter } from "./content-manager"

export const  base_router = Router()

base_router.use("/content", contentRouter)

