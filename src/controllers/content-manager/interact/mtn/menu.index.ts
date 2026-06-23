import { Request, Response, NextFunction } from "express"
import { InternalError } from "../../../../util/errorHandler"
import { getMenu, validateInteractionDTO } from "./menu.util"

// exports.contentCallbackTest = catchAsync(async (req, res, next) => {


export async function MTNMenuController(req: Request, res: Response, next: NextFunction) {

  try {
    console.log("contentCallback:::test:::", req?.body)

    // const option_ = req.body.ussdString
    // switch (option_) {
    //   case "1":
    //     res.status(200).json(
    //       {
    //         messageType: 1,
    //         msisdn: req.body.msisdn,
    //         serviceCode: req.body.serviceCode,
    //         // ussdString: 'Welcome to Lucky Bag\n1. Japa Deluxe (#100)\n2. Oshofri (#50)\n3. Big Bag (#200)\n4. Mega Flex (#500)\n5. Cashout\n6. Winnings\n7. Unsubscribe.',
    //         // ussdString: 'Hello, choose a menu\n1. Balance\n2. Exit',
    //         ussdString: "Welcome to Br Test. \n press 5 to proceed",

    //       })
    //     break

    //   case "2":
    //     res.status(200).json(
    //       {
    //         messageType: 2,
    //         msisdn: req.body.msisdn,
    //         serviceCode: req.body.serviceCode,
    //         // ussdString: 'Welcome to Lucky Bag\n1. Japa Deluxe (#100)\n2. Oshofri (#50)\n3. Big Bag (#200)\n4. Mega Flex (#500)\n5. Cashout\n6. Winnings\n7. Unsubscribe.',
    //         // ussdString: 'Hello, choose a menu\n1. Balance\n2. Exit',
    //         ussdString: "Thank you for participating",

    //       })
    //     break

    //   case "3":
    //     res.status(200).json(
    //       {
    //         messageType: 1,
    //         msisdn: req.body.msisdn,
    //         serviceCode: req.body.serviceCode,
    //         // ussdString: 'Welcome to Lucky Bag\n1. Japa Deluxe (#100)\n2. Oshofri (#50)\n3. Big Bag (#200)\n4. Mega Flex (#500)\n5. Cashout\n6. Winnings\n7. Unsubscribe.',
    //         // ussdString: 'Hello, choose a menu\n1. Balance\n2. Exit',
    //         ussdString: "Now, go back to the top \n Press 1",

    //       })
    //     break

    //   case "5":
    //     res.status(200).json(
    //       {
    //         messageType: 1,
    //         msisdn: req.body.msisdn,
    //         serviceCode: req.body.serviceCode,
    //         // ussdString: 'Welcome to Lucky Bag\n1. Japa Deluxe (#100)\n2. Oshofri (#50)\n3. Big Bag (#200)\n4. Mega Flex (#500)\n5. Cashout\n6. Winnings\n7. Unsubscribe.',
    //         // ussdString: 'Hello, choose a menu\n1. Balance\n2. Exit',
    //         ussdString: "Welcome my friend",

    //       })
    //     break

    //   default:

    //     res.status(200).json(
    //       {
    //         messageType: 1,
    //         msisdn: req.body.msisdn,
    //         serviceCode: req.body.serviceCode,
    //         // ussdString: 'Welcome to Lucky Bag\n1. Japa Deluxe (#100)\n2. Oshofri (#50)\n3. Big Bag (#200)\n4. Mega Flex (#500)\n5. Cashout\n6. Winnings\n7. Unsubscribe.',
    //         // ussdString: 'Hello, choose a menu\n1. Balance\n2. Exit',
    //         ussdString: "Kindly select an option : \n 1. Proceed \n 2. Exit \n 3. Attempt having fun",

    //       }
    //     )
    // }

    const dto = await validateInteractionDTO(req.body)


    const menu = await getMenu(dto)


    res.status(200).json(menu)

  } catch (error) {

    console.log("eeee===> ", error)
    next(new InternalError(error))
  }

};