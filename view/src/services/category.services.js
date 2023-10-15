import { getRequest, postRequest, deleteRequest, putRequest } from "./axios.services";

export const categoryCreate = async (data) => {
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

        let response = await postRequest("/category", formData, true, true);

        if(response.status){
            return response;
        }else{
            return false;
        }

    }catch(error){
        throw error;
    }
}

export const getAllCategories = async () => {
    try{
        let category = await getRequest('/category');
        return category;
    }catch(error){
        // Error handling
        console.error("Err: ", error);
    }
}

export const updateCategory = async (data, id) => {
    
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

        let response = await putRequest("/category/"+id, formData, true, true);

        if(response.status){
            return response;
        }else{
            return false;
        }

    }catch(error){
        throw error;
    }

}
export const deleteCategoryById = async (id) => {
    try{
        let response = await deleteRequest('/category/'+id, true);
        return response;
    }catch(error){
        console.error("Err: ", error);
    }
}

export const getCategoryById = async (id) => {
    try{
        let response = await getRequest('/category/'+id)
        return response;
    }catch(error) {
        console.error("Err: ", error);
    }
}