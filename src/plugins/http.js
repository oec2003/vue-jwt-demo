import axios from "axios";

const http = axios.create({
    timeout: 5000
});

http.interceptors.request.use(
    config => {
        if (localStorage.JWT_TOKEN) {
            config.headers.Authorization = `bearer ${localStorage.JWT_TOKEN}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
export default http;