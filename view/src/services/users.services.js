import { getRequest, postRequest, deleteRequest, putRequest } from "./axios.services";

export const userCreate = async (data) => {
    try{
        let formData = new FormData();
        if(data.image){
            formData.append('image', data.image, data.image.name);
            delete data.image;
        }

        Object.keys(data).map((key) => {
            formData.append(key, data[key]);
            return null;
        });

        let response = await postRequest("/user", formData, true, true);

        if(response.status){
            return response;
        }else{
            return false;
        }

    }catch(error){
        throw error;
    }
}

export const getAllUsers = async () => {
    try{
        let user = await getRequest('/user');
        return user;
    }catch(error){
        // Error handling
        console.error("Err: ", error);
    }
}

export const updateUser = async (data, id) => {
    
    try{
        let formData = new FormData();
        if(data.image && typeof(data.image) === 'object'){
            formData.append('image', data.image, data.image.name);
            delete data.image;
        }else{
            delete data.image;
        }

        Object.keys(data).map((key) => {
            formData.append(key, data[key]);
            return null;
        });

        let response = await putRequest("/user/"+id, formData, true, true);

        if(response.status){
            return response;
        }else{
            return false;
        }

    }catch(error){
        throw error;
    }

}
export const deleteUserById = async (id) => {
    try{
        let response = await deleteRequest('/user/'+id, true);
        return response;
    }catch(error){
        console.error("Err: ", error);
    }
}

export const getUserById = async (id) => {
    try{
        let response = await getRequest('/user/'+id)
        return response;
    }catch(error) {
        console.error("Err: ", error);
    }
}