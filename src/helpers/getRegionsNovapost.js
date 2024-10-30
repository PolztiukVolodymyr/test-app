import { getNovaPoshtaData } from "../services/novaPoshta";

const novapostKey = process.env.NOVAPOST_KEY


export async function getRegionsArray() {
    const response = await getNovaPoshtaData({
        apiKey: novapostKey,
        modelName: "AddressGeneral",
        calledMethod: "getSettlementAreas",
        methodProperties: {},
    })
    // console.log('response: ', response)
    const regionArrayData = await response.data.map(el => ({ description: el.Description, id: el.Ref }))
    return regionArrayData;

}

export async function getSettlementById(id) {
    const response = await getNovaPoshtaData({
        apiKey: novapostKey,
        modelName: "AddressGeneral",
        calledMethod: "getSettlements",
        methodProperties: {
            AreaRef: id,
            Warehouse: "1"
        },
    })
    // console.log('responseSettlementById: ', response)
    // return response

    const settlementListArr = await response.data.map(el => el.Description)
    return settlementListArr;

}

export async function getSettlementByString(string) {
    const response = await getNovaPoshtaData({
        apiKey: novapostKey,
        modelName: "AddressGeneral",
        calledMethod: "getCities",
        methodProperties: {
            FindByString: string,
            Limit: "20"
        },
    })
    console.log('responseSettlementByString: ', response)
    // return response
    const settlementListArr = await response.data
        // .filter(el => el.length > 0)
        .map(el => el.Description)
    // console.log('FILTRREDSettlementByString: ', settlementListArr)
    return settlementListArr;
}



export async function getCityDepartmentsByString(cityName, string) {
    const response = await getNovaPoshtaData({
        apiKey: novapostKey,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
            FindByString: string,
            CityName: cityName,
            Limit: "20"
        },
    })
    console.log('responseCityDepartmentByString: ', response)
    // return response
    const departmentListArr = await response.data.map(el => el.Description)
    return departmentListArr;
}


export async function getCityDepartmentsByCityName(cityName) {
    const response = await getNovaPoshtaData({
        apiKey: novapostKey,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
            CityName: cityName,
            Limit: "20"
        },
    })
    // console.log('responseCityDepartmentByString: ', response)
    // return response
    const departmentListArr = await response.data.map(el => el.Description)

    return departmentListArr;
}

// calledMethod: "getSettlementsref"


// {
//     "apiKey": "8d677609f6e47ce83929374b3afab572",
//         "modelName": "AddressGeneral",
//             "calledMethod": "getWarehouses",
//                 "methodProperties": {
//         "CityName": "луцьк",
//             "Limit": "20"
//     }
// }