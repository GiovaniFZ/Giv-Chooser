import { useQuery } from "@tanstack/react-query"
import { GetNumbers } from "../../api/getNumbers"
import { z } from "zod"
import { GenNumberField } from "../GenNumberField"

const paramsNumberSchema = z.object({
    max: z.number(),
    min: z.number(),
    count: z.number(),
  }).refine((data) => data.max > data.min, {
    message: "max should be greater!",
  })

  type ParamsNumber = z.infer<typeof paramsNumberSchema>

export function ShowNumber({max, min, count}: ParamsNumber) {
    const { data: genNumbers } = useQuery({
        queryKey: ['gen_number'],
        queryFn: () => GetNumbers({max, min, count})
    })

    return (
        <GenNumberField>{genNumbers}</GenNumberField>
    )
}