import { useNavigate, useParams } from "react-router-dom";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import { LabelFormComponent } from "../../../components/cms/label-form.component";
import {  getBrandById, updateBrand } from "../../../services/brand.services";
import {toast} from 'react-toastify'
import { useEffect, useState } from "react";
const BrandEditPage = () => {
    let navigate = useNavigate();
 
    let params = useParams();

    let [data, setData] = useState();

    const handleUpdateAction = async (data) => {
        try{
            // console.log("Data: ", data);
            let response = await updateBrand(data, params.id);
            if(response.status){
                toast.success(response.msg);
            }else{
                toast.error(response.msg);
            }

            navigate('/admin/brand');
        }catch(err){
            console.log("Error: ", err);
        }
    }

    const getBrandData = async () => {
        try{
            let response = await getBrandById(params.id);
            // console.log("response: ", response)
            if(response.status){
                setData(response.result);
            }
        }catch(eer){
            console.error("error: ", eer);
        }
    }

    useEffect(() => {
        getBrandData();
    }, [params])
    
    return (
        <>
            <div className="container-fluid px-4">
                <BreadCrumb title="Brand Update" pageTitle="Brand Create" addBtn={true}  page="Brand" />
                <div className="card mb-4">
                    <div className="card-body">
                        <LabelFormComponent
                        onSubmitEvent={handleUpdateAction} type="Brand" data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BrandEditPage;