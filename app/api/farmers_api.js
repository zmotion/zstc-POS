import ApiManager from "./ApiManager";

export const farmers = async (token) => {
    try {
        const result = await ApiManager("/farmers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            }
        })

        return result;
    } catch (error) {
        return error
    }
}