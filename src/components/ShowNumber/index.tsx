import { useQuery } from "@tanstack/react-query"
import { GetNumbers } from "../../api/getNumbers"
import { z } from "zod"
import { GenNumberField, GenNumberFieldMargin, NumbersContainer, SmallNumbersContainer } from "../GenNumberField"

const paramsNumberSchema = z.object({
  max: z.number(),
  min: z.number(),
  count: z.number(),
}).refine((data) => data.max > data.min, {
  message: "max should be greater!",
})

type ParamsNumber = z.infer<typeof paramsNumberSchema>

export function ShowNumber({ max, min, count }: ParamsNumber) {
  const { data: genNumbers, isLoading } = useQuery({
    queryKey: ['gen_number', count, max, min],
    queryFn: () => GetNumbers({ max, min, count })
  })

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  if (!genNumbers) {
    return (
      <h1>Something went wrong!</h1>
    )
  }

  if (genNumbers.length < 6) {
    return (
      <SmallNumbersContainer>
        {Array.from({ length: count }).map((_, i) => (
          <GenNumberField key={i}>{genNumbers[i]}</GenNumberField>
        ))}
      </SmallNumbersContainer>
    )
  }

  return (
      <NumbersContainer>
        {Array.from({ length: count }).map((_, i) => (
          <GenNumberFieldMargin key={i}>{genNumbers[i]}</GenNumberFieldMargin>
        ))}
      </NumbersContainer>
  )
}