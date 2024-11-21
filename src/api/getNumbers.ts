import { api } from "../lib/axios";

interface GetNumberQuery {
    max: number,
    min: number,
    count: number,
}

export async function GetNumbers({ max, min, count }: GetNumberQuery) {
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
    return response.data
}