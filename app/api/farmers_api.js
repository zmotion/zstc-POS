import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const getFarmers = async () => {
    let token  = await AsyncStorage.getItem("token")
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

export const getFarmer = async () => {
    let token  = await AsyncStorage.getItem("token")
    try {
        const result = await ApiManager("/farmer", {
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

export const postFarmer = async data => {
    let token  = await AsyncStorage.getItem("token")
    try {
        const result = await ApiManager("/add-farmer-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            },
            data: data
        })

        return result;
    } catch (error) {
        return error
    }
}