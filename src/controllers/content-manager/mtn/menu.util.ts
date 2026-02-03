
const x = {
    "messageType": 1,
    "msisdn": "2347071427843",
    "serviceCode": "44004",
    "ussdString":""
}

import {object, string, number} from "yup"

export const interactionDTO = object(
    {  
        messageType: number(),
        msisdn: string(),
        serviceCode: string(),
        ussdString: string(),
        sessionId: string().required("Id of session interaction missing in payload")
    }
)

export type TinteractionDTO = typeof interactionDTO.__outputType

export async function validatePayload(body: any){
    const dto = await interactionDTO.validate(body)

    return dto 
}

// export function 