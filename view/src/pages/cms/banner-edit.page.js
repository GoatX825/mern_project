import { useNavigate, useParams } from "react-router-dom";
import { BreadCrumb } from "../../components/cms/breadcrumb.component";
import { LabelFormComponent } from "../../components/cms/label-form.component";
import {  getBannerById, updateBanner } from "../../services/banner.services";
import {toast} from 'react-toastify'
import { useEffect, useState } from "react";
const BannerEditPage = () => {
    let navigate = useNavigate();
 
    let params = useParams();

    let [data, setData] = useState();

    const handleUpdateAction = async (data) => {
        try{
            // console.log("Data: ", data);
            let response = await updateBanner(data, params.id);
            if(response.status){
                toast.success(response.msg);
            }else{
                toast.error(response.msg);
            }

            navigate('/admin/banner');
        }catch(err){
            console.log("Error: ", err);
        }
    }

    const getBannerData = async () => {
        try{
            let response = await getBannerById(params.id);
            // console.log("response: ", response)
            if(response.status){
                setData(response.result);
            }
        }catch(eer){
            console.error("error: ", eer);
        }
    }

    useEffect(() => {
        getBannerData();
    }, [params])
    
    return (
        <>
            <div className="container-fluid px-4">
                <BreadCrumb title="Banner Update" pageTitle="Banner Create" addBtn={true}  page="Banner" />
                <div className="card mb-4">
                    <div className="card-body">
                        <LabelFormComponent
                        onSubmitEvent={handleUpdateAction} type="banner" data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BannerEditPage;