


import { Redis } from "ioredis"

import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_TLS, REDIS_USERNAME } from "../util/secrets";
// import { SECRETS } from "../util/secrets";

export const redis = new Redis({
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    // tls: REDIS_TLS,
    maxRetriesPerRequest: null,
});



export namespace RedisController {
    export const SCOPE_KEY = {
        session: (sessionId: string) => {
            return "session:" + sessionId
        },

        stateIdChain: (previous: string | undefined | null, current: string | undefined | null) => {
            if (!previous) return current ?? "";
            return previous + (current ? "*" + current : "");
        }


    }

    export async function setKey(key: string, value: object, expiry: number = 604800) {
        await redis.set(key, JSON.stringify(value), "EX", expiry)
    }

    export async function getKeyValue(key: string) {
        return await redis.get(key)
    }

    export async function push(key: string, element: any[], expiry: number = 3600) {
        await redis.rpush(key, ...element)
        await redis.expire(key, expiry)
    }

    export async function getArray<T>(key: string) {
        return await redis.lrange(key, 0, -1)
    }

    export async function setStringValue(key: string, value: string, expiry: number = 604800) {
        await redis.set(key, value, "EX", expiry)
    }
}