import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 30000, 
    timeoutErrorMessage: "Server timed out",
    headers: {
        "Content-Type": 'application/json'
    }
})

let headers = {};

// interceptor is a middleware: It is a response interceptor
axiosInstance.interceptors.response.use((response) => {
    // success
    if(response.status === 200) {
        return response.data;
    }else{
        // error
        console.log("Interceptor error: ", response);
        return response;
    }
})

const getHeaders = (is_strict, form_data=false) => {
    if(is_strict){
        let token = localStorage.getItem('token');
        headers = {
            ...headers,
            headers: {
                "authorization": "Bearer "+token
            }
        }
    }
    
    if(form_data){
        headers = {
            ...headers,
            headers:{
                'content-type': 'multipart/form-data',
                ...headers.headers
            }
        }
    }
}

export const postRequest = (url, data, is_strict=false, form_data=false) => {
    getHeaders(is_strict, form_data);
    return axiosInstance.post(url, data, headers);
}

export const putRequest = (url, data, is_strict=false, form_data=false) => {
    getHeaders(is_strict, form_data);
    return axiosInstance.put(url, data, headers);
}

export const getRequest = (url, is_strict=false) => {
    let headers = {};
    if(is_strict) {
        let token = localStorage.getItem('token');
        headers = {
            headers: {
                'authorization': "Bearer "+token
            }
        }
    }
    return axiosInstance.get(url, headers);
}

export const deleteRequest = (url, is_strict = false) => {
    let headers = {};
    if(is_strict) {
        let token = localStorage.getItem('token');
        headers = {
            headers: {
                'authorization': "Bearer "+token
            }
        }
    }
    return axiosInstance.delete(url, headers);
}