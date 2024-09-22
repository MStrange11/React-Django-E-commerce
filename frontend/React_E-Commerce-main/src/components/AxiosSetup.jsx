import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:8000/"

const CreateAuthAxios = () => {
    const token = Cookies.get("userToken")
    if (!token) {
        console.error("token cookie not found!")
        return
    }
    const authAxios = axios.create({
        baseURL: baseURL,
    });

    authAxios.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `token ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return authAxios;
};

export default CreateAuthAxios;
export { baseURL }