import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
};
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    skipAuth?: boolean;
}

instance.interceptors.request.use(
    async (config: CustomAxiosRequestConfig) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
    },
    async (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default instance;