import { useQuery } from "@tanstack/react-query"
import { z } from "zod"
import { GetWords } from "../../api/getWords"
import { Button } from "../Button"
import { useNavigate } from "react-router-dom"
const paramsWordSchema = z.object({
  count: z.number(),
  words: z.array(z.string())
})

type ParamsWords = z.infer<typeof paramsWordSchema>

export function ShowWords({ count, words }: ParamsWords) {
  const navigate = useNavigate();
  const { data: genWords, isLoading, error } = useQuery({
    queryKey: ['gen_word', count, words],
    queryFn: () => GetWords({ count, words })
  })

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  if (error) {
    return (
      <div>
        <h1 style={{ color: "red" }}>An error occurred! Try again.</h1>
        <Button
          onClick={() => {
            navigate("/word");
          }}
        >
          Try again
        </Button>
      </div>
    )
  }

  if (!genWords) {
    return (
      <h1 style={{ color: "red" }}>No data available!</h1>
    )
  }

  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <h1 key={i}>{genWords[i]}</h1>
      ))}
      <Button
        onClick={() => {
          navigate("/word");
        }}
      >
        Sort again!
      </Button>
    </div>
  )
}