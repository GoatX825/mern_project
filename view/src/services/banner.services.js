import { getRequest, postRequest, deleteRequest, putRequest } from "./axios.services";

export const bannerCreate = async (data) => {
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

        let response = await postRequest("/label", formData, true, true);

        if(response.status){
            return response;
        }else{
            return false;
        }

    }catch(error){
        throw error;
    }
}

export const getAllBanners = async () => {
    try{
        let banners = await getRequest('/label?type=banner');
        return banners;
    }catch(error){
        // Error handling
        console.error("Err: ", error);
    }
}

export const getAllActiveBanners = async () => {
    try{
        let banners = await getRequest("label/active-label?type=banner&status=active&sort=1");
        return banners;
    }catch(error){
        console.error("Error: ", error);
    }
}

export const updateBanner = async (data, id) => {
    
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

        let response = await putRequest("/label/"+id, formData, true, true);

        if(response.status){
            return response;
        }else{
            return false;
        }

    }catch(error){
        throw error;
    }

}
export const deleteBannerById = async (id) => {
    try{
        let response = await deleteRequest('/label/'+id, true);
        return response;
    }catch(error){
        console.error("Err: ", error);
    }
}

export const getBannerById = async (id) => {
    try{
        let response = await getRequest('/label/'+id)
        return response;
    }catch(error) {
        console.error("Err: ", error);
    }
}