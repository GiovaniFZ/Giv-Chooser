import { useQuery } from "@tanstack/react-query"
import { z } from "zod"
import { GetWords } from "../../api/getWords"
import { Button } from "../Button"
import { useNavigate } from "react-router-dom"
import { GenWordsField } from "./styles"
const paramsWordSchema = z.object({
  count: z.number(),
  words: z.array(z.string())
})

type ParamsWords = z.infer<typeof paramsWordSchema>

export function ShowWords({ count, words }: ParamsWords) {
  const filteredWords = words.filter(word => word.trim() !== "")
  const navigate = useNavigate();
  const { data: genWords, isLoading, error } = useQuery({
    queryKey: ['gen_word', count, filteredWords],
    queryFn: () => GetWords({ count, words: filteredWords })
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

  const hasMoreThanOneCount = false // Feature to be implemented

  return (
    <div>
      {hasMoreThanOneCount && Array.from({ length: count }).map((_, i) => (
        <GenWordsField key={i}>{genWords[i]}</GenWordsField>
      ))}
      {!hasMoreThanOneCount && (
        <GenWordsField>{genWords[0]}</GenWordsField>
      )}
      <Button
        onClick={() => {
          navigate("/word");
        }}
      >
        Choose again!
      </Button>
    </div>
  )
}