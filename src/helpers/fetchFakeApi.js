export const getDefaultValuesFromApi = async () => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
    );
    const data = await response.json();
    return {
        userName: "",
        email: data.email,
    };
};
