import { z } from 'zod';
import { api } from '../lib/axios';

interface GetWordsQuery {
  count: number;
  words: string[];
  no_repeat: boolean;
}

export async function GetWords({ count, words, no_repeat }: GetWordsQuery) {
  const responseDataSchema = z.object({
    results: z.array(z.string()),
  });
  const response = await api.post('/randomwords', {
    count,
    words,
    no_repeat,
  });
  const { results } = responseDataSchema.parse(response.data);
  return results;
}
