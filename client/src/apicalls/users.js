import { axiosInstance } from "./axiosInstance";

//registrovanje korisnika
export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/register", payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//prijavljivanje korisnika
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/login", payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//dohvatanje detalja o korisniku
export const GetLoggedInUserDetails = async () => {
    try {
        const response = await axiosInstance.get("/api/users/get-logged-in-user");
        return response.data;
    } catch (error) {
        throw error;
    }
}