import { Api } from "../utils/BaseUrlAerver"

const API = Api();

export const login = (data) => {
    return API.post("/auth/login", data)
}