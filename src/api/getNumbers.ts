import { z } from "zod";
import { api } from "../lib/axios";

interface GetNumberQuery {
    max: number,
    min: number,
    count: number,
}

export async function GetNumbers({ max, min, count }: GetNumberQuery) {
    const responseDataSchema = z.object({
        result: z.array(z.number())
    })
    const response = await api.get('/random', {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        params: {
            max,
            min,
            count,
        }
    })
    const { result } = responseDataSchema.parse(response.data);
    return result
}