import { get, post } from '../utils/http_client';

export const getAll = async () => {
    const response = await get(`permission/index`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
}
