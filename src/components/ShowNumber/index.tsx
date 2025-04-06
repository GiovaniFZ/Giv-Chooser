import { useQuery } from "@tanstack/react-query"
import { GetNumbers } from "../../api/getNumbers"
import { z } from "zod"
import { GenNumberField, GenNumberFieldMargin, NumbersContainer, SmallNumbersContainer } from "../GenNumberField"
import { Button } from "../Button"
import { useNavigate } from "react-router-dom"
import { ShowErrorComponent } from "../Error"

const paramsNumberSchema = z.object({
  max: z.number(),
  min: z.number(),
  count: z.number(),
}).refine((data) => data.max > data.min, {
  message: "max should be greater!",
})

type ParamsNumber = z.infer<typeof paramsNumberSchema>

export function ShowNumber({ max, min, count }: ParamsNumber) {
  const navigate = useNavigate();
  const { data: genNumbers, isLoading, error } = useQuery({
    queryKey: ['gen_number', count, max, min],
    queryFn: () => GetNumbers({ max, min, count })
  })

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  if (error) {
    return (
      <ShowErrorComponent />
    )
  }

  if (!genNumbers) {
    return (
      <h1>Something went wrong!</h1>
    )
  }

  if (genNumbers.length < 6) {
    return (
      <>
        <SmallNumbersContainer>
          {Array.from({ length: count }).map((_, i) => (
            <GenNumberField key={i}>{genNumbers[i]}</GenNumberField>
          ))}
        </SmallNumbersContainer>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Sort again!
        </Button>
      </>
    )
  }

  return (
    <>
      <NumbersContainer>
        {Array.from({ length: count }).map((_, i) => (
          <GenNumberFieldMargin key={i}>{genNumbers[i]}</GenNumberFieldMargin>
        ))}
      </NumbersContainer>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Sort again!
      </Button>
    </>
  )
}