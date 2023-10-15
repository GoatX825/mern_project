import { useNavigate, useParams } from "react-router-dom";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import {  getCategoryById, updateCategory } from "../../../services/category.services";
import {toast} from 'react-toastify'
import { useEffect, useState } from "react";
import { CategoryFormComponent } from "../../../components/cms/category-form.component";
const CategoryEditPage = () => {
    let navigate = useNavigate();
 
    let params = useParams();

    let [data, setData] = useState();

    const handleUpdateAction = async (data) => {
        try{
            console.log("Data: ", data);
            let response = await updateCategory(data, params.id);
            if(response.status){
                toast.success(response.msg);
            }else{
                toast.error(response.msg);
            }

            navigate('/admin/category');
        }catch(err){
            console.log("Error: ", err);
        }
    }

    const getCategoryData = async () => {
        try{
            let response = await getCategoryById(params.id);
            // console.log("response: ", response)
            if(response.status){
                setData(response.result);
            }
        }catch(eer){
            console.error("error: ", eer);
        }
    }

    useEffect(() => {
        getCategoryData();
    }, [params])
    
    return (
        <>
            <div className="container-fluid px-4">
                <BreadCrumb title="Category Update" pageTitle="Category Create" addBtn={true}  page="Category" />
                <div className="card mb-4">
                    <div className="card-body">
                        <CategoryFormComponent
                        onSubmitEvent={handleUpdateAction} type="Category" data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryEditPage;