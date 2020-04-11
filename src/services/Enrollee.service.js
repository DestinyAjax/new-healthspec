import { get } from "../utils/http_client";

// export const getProviderEnrollees = async payload => {
//     const response = await get(`provider_id/enrollees/index?page=${payload}`);
//     const data = await response.json();

//     if (response.status !== 200) {
//         throw new Error(data);
//     }

//     return data;
// }

export const getProviderEnrollee = async payload => {
    const response = await get(`enrollee/show/${payload}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data);
    }

    return data;
};
