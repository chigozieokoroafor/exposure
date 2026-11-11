import { SubscriptionWebhookController } from "./webhook";
import {Router} from "express"

export const  subscription_router = Router()

subscription_router.post("/webhook", SubscriptionWebhookController)

