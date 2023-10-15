import { getRequest, postRequest, deleteRequest, putRequest } from "./axios.services";

export const productCreate = async (data) => {
    try{
        let formData = new FormData();
        if(data.image){
            data.image.map((img) => {
                formData.append('image', img, img.name);
                return null;
            })
            delete data.image;
        }

        Object.keys(data).map((key) => {
            formData.append(key, data[key]);
            return null;
        });

        let response = await postRequest("/product", formData, true, true);

        if(response.status){
            return response;
        }else{
            return false;
        }

    }catch(error){
        throw error;
    }
}

export const getAllProducts = async () => {
    try{
        let product = await getRequest('/product');
        return product;
    }catch(error){
        // Error handling
        console.error("Err: ", error);
    }
}

export const getProductByCategory = async (cat) => {
    try{
        let product = await getRequest('/product/by-cat/'+cat);
        return product;
    }catch(error){
        // Error handling
        console.error("Err: ", error);
    }
}
export const getAllActiveProducts = async () => {
    try{
        let product = await getRequest('/product/active-product');
        return product;
    }catch(error){
        // Error handling
        console.error("Err: ", error);
    }
}

export const updateProduct = async (data, id) => {
    
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

        let response = await putRequest("/product/"+id, formData, true, true);

        if(response.status){
            return response;
        }else{
            return false;
        }

    }catch(error){
        throw error;
    }

}
export const deleteProductById = async (id) => {
    try{
        let response = await deleteRequest('/product/'+id, true);
        return response;
    }catch(error){
        console.error("Err: ", error);
    }
}

export const getProductById = async (id) => {
    try{
        let response = await getRequest('/product/'+id)
        return response;
    }catch(error) {
        console.error("Err: ", error);
    }
}
