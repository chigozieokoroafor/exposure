
const x = {
    "messageType": 1,
    "msisdn": "2347071427843",
    "serviceCode": "44004",
    "ussdString": ""
}

import { object, string, number } from "yup"
import { StateManager } from "../../../../util/state-manager"

export const InteractionDTO = object(
    {
        messageType: number(),
        msisdn: string(),
        serviceCode: string(),
        ussdString: string(),
        sessionId: string()//.required("Id of session interaction missing in payload")
    }
)

export type TInteractionDTO = typeof InteractionDTO.__outputType

export async function validateInteractionDTO(body: any) {
    const dto = await InteractionDTO.validate(body)

    return dto
}

export async function getMenu(dto: TInteractionDTO) {
    
    let menu: string
    try {
        const stateId = await StateManager.handleStateChangeWithMessagetypecheck(dto?.msisdn!, dto?.ussdString!, dto.messageType)
        menu = await StateManager.getState(stateId)

    } catch (error: any) {
        return {
            messageType: 2,
            msisdn: dto.msisdn,
            serviceCode: dto.serviceCode,
            // ussdString: 'Welcome to Lucky Bag\n1. Japa Deluxe (#100)\n2. Oshofri (#50)\n3. Big Bag (#200)\n4. Mega Flex (#500)\n5. Cashout\n6. Winnings\n7. Unsubscribe.',
            // ussdString: 'Hello, choose a menu\n1. Balance\n2. Exit',
            ussdString: error.message,

        }
    }

    return {
        messageType: 1,
        msisdn: dto.msisdn,
        serviceCode: dto.serviceCode,
        // ussdString: 'Welcome to Lucky Bag\n1. Japa Deluxe (#100)\n2. Oshofri (#50)\n3. Big Bag (#200)\n4. Mega Flex (#500)\n5. Cashout\n6. Winnings\n7. Unsubscribe.',
        // ussdString: 'Hello, choose a menu\n1. Balance\n2. Exit',
        ussdString: menu,

    }

    // return menu
}