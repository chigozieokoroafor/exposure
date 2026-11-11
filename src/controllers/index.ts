import { Router } from "express"
import { contentRouter } from "./content-manager"
import { subscription_router } from "./subscriptions"

export const base_router = Router()

base_router.use("/content", contentRouter)
base_router.use("/subscription", subscription_router)

