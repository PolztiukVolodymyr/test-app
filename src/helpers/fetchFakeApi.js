export const getDefaultUsersEmailFromApi = async () => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
    );
    const data = await response.json();
    return {
        userName: "",
        email: data.email,
    };
};

export const isEmailExist = async (fieldValue) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
    );
    const data = await response.json();
    return data.length === 0 || "Email alredy exist"
};