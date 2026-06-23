import { string, object, number } from "yup";
import { prisma } from "../../../../db";

export const UploadDTO = object(
    {
        name: string().required("Missing value of name of menu"), // Renamed from 'menu' to avoid conflicts
        stateId: string().required("Missing value of stateId"),
        menuString: string().required("Missing value of menu string"),

        parentId: string().optional()
    }
)


export type TUploadDTO = typeof UploadDTO.__outputType;

export async function validateUploadDTO(body: any) {
    const dto = await UploadDTO.validate(body)
    return dto
}

export async function createMenuRecord(dto: TUploadDTO) {
    const exists = await prisma.menu.findFirst(
        {
            where: {
                stateId: dto.stateId
            }
        }
    )

    if (exists) {
        throw new Error("Menu with provided state id exists.")
    }

    await prisma.menu.create(
        { data: dto }
    )
}