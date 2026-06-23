import { number } from "yup";
import { prisma } from "../db";
import { RedisController } from "../db/redis";
import { InternalError } from "./errorHandler";

export namespace StateManager {

    export async function handleStateChange(sessionId: string, stateId: string) {
        const sessionKey = RedisController.SCOPE_KEY.session(sessionId);
        const userExistingState = await RedisController.getKeyValue(sessionKey);
        let userState: { previous: string | null, current: string };
        if (userExistingState) {
            userState = JSON.parse(userExistingState);
            
            // Generate the new chain by appending the input to the CURRENT state
            const newCurrent = RedisController.SCOPE_KEY.stateIdChain(userState.current, stateId);
            
            userState.previous = userState.current;
            userState.current = newCurrent;
        } else {
            // First time the user interacts, start the chain
            userState = {
                previous: null,
                current: stateId // e.g. "44004"
            };
        }

        console.log("state ===> ",userState)
        // Save using the proper sessionKey
        await RedisController.setKey(sessionKey, userState, 50 * 5);
        
        return userState.current; // It's usually helpful to return the generated chain
    }

    export async function getState(stateId: string) {

        // stateID is by default going to be a chain

        // do a check for if  back or exit is clicked

        let menu = await RedisController.getKeyValue(stateId)
        if (!menu) {
            menu = await getStateFromDB(stateId)
        }

        return menu + "\n 98. Back \n 99. Exit"

    }

    export async function setState(stateId: string, menu: string) {
        await RedisController.setStringValue(stateId, menu, 60 * 5)
    }

    export async function getStateFromDB(stateId: string) {
        const menu = await prisma.menu.findUnique(
            {
                where: {
                    stateId: stateId
                }
            }
        )

        if (!menu) {
            throw new InternalError(null,"Whoops, wrong option selected")
        }

        await setState(stateId, menu.menuString)

        return menu.menuString
    }
}
