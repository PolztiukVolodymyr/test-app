import { getNovaPoshtaData } from "../services/novaPoshta";


// export function getRegionsNovapost() {

//     return {
//         apiKey: "8d677609f6e47ce83929374b3afab572",
//         modelName: "AddressGeneral",
//         calledMethod: "getAreas",
//         methodProperties: {},
//     };
// }

export async function getRegionsArray() {
    const response = await getNovaPoshtaData({
        apiKey: "8d677609f6e47ce83929374b3afab572",
        modelName: "AddressGeneral",
        calledMethod: "getAreas",
        methodProperties: {},
    })
    const regionArray = await response.data.map(el => el.Description)
    return regionArray;

}
