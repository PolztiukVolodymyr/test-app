import axios from 'axios';


export const getNovaPoshtaData = async body => {
    try {
        const { data, status } = await axios.post('https://api.novaposhta.ua/v2.0/json/',
            body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (status !== 200) {
            throw new Error(`Failed to fetch data: ${status}`);
        }
        return data;
    } catch (error) {
        console.log(error.message);
        return error;
    }
};


// try {
//     const { data, status } = await novaPoshtaApi.post(``, body);
//     if (status !== 200) {
//         throw new Error(`Failed to fetch data: ${status}`);
//     }
//     return data;
// } catch (error) {
//     console.log(error.message);
//     return error;
// }


// export const novaPoshtaApi = axios.create({
//     baseURL: 'https://api.novaposhta.ua/v2.0/json/',
// });

// export const getData = async body => {
//     try {
//         const { data, status } = await novaPoshtaApi.post(``, body);
//         if (status !== 200) {
//             throw new Error(`Failed to fetch data: ${status}`);
//         }
//         return data;
//     } catch (error) {
//         console.log(error.message);
//         return error;
//     }
// };