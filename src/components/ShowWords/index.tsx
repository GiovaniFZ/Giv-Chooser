import { useQuery } from "@tanstack/react-query"
import { z } from "zod"
import { GetWords } from "../../api/getWords"
const paramsWordSchema = z.object({
    count: z.number(),
    words: z.array(z.string())
})

type ParamsWords = z.infer<typeof paramsWordSchema>

export function ShowWords({ count, words }: ParamsWords) {
  const { data: genWords, isLoading } = useQuery({
    queryKey: ['gen_word', count, words],
    queryFn: () => GetWords({ count, words })
  })

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  if (!genWords) {
    return (
      <h1>Something went wrong!</h1>
    )
  }

  return (
      <div>
        {Array.from({ length: count }).map((_, i) => (
          <h1 key={i}>{genWords[i]}</h1>
        ))}
      </div>
    )
}