import axios, { Axios } from 'axios';

export function setAuthToken(token) {
    localStorage.setItem('USER_AUTH_TOKEN' , token);
    // localStorage.setItem('USER_AUTH_TOKEN' , bToken);
    // localStorage.setItem('USER_AUTH_TOKEN' , rToken);
};

export function getAuthToken(token) {
    return localStorage.getItem('USER_AUTH_TOKEN' ,token);
};

export function deletAuthToken(token) {
    localStorage.removeItem('USER_AUTH_TOKEN');
};

export async function verifyUserToken() {
    
};

export function axiosInterceptors(){
    axios.Interceptors.request.use(function(config) {
        const token = getAuthToken();

        if (token) {
            config.headers.Authorization = `bearer ${token}`
        }

        return(config)
    });
}