import { z } from 'zod';
import { api } from '../lib/axios';

interface GetWordsQuery {
  count: number;
  words: string[];
}

export async function GetWords({ count, words }: GetWordsQuery) {
  const responseDataSchema = z.object({
    results: z.array(z.string()),
  });
  const response = await api.post('/randomwords', {
    count,
    words,
  });
  const { results } = responseDataSchema.parse(response.data);
  return results;
}
