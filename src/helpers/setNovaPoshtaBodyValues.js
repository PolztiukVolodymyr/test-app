export function setNovaPostBodyValues(city, pageNumber, departmentNumber) {

    return {
        apiKey: "8d677609f6e47ce83929374b3afab572",
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
            CityName: city,
            Page: pageNumber,
            Limit: "50",
            Language: "UA",
            WarehouseId: departmentNumber,
        },
    };
}

