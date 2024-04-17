import ApiManager from "./ApiManager";

export const user_api = async data => {
    try {
        const result = await ApiManager("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        })

        return result;
    } catch (error) {
        return error
    }
}