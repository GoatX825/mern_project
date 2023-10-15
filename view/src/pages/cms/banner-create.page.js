import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../components/cms/breadcrumb.component";
import { LabelFormComponent } from "../../components/cms/label-form.component";
import { bannerCreate } from "../../services/banner.services";
import {toast} from 'react-toastify'
const BannerCreatePage = () => {
    let navigate = useNavigate();
    const handleAddAction = async (data) => {
        try{
            // console.log("Data: ", data);
            let response = await bannerCreate(data);
            // console.log("response: ", response);
            if(response.status){
                toast.success(response.msg)
                navigate('/admin/banner');   
            }else{
                toast.error(response.msg)
            }

        }catch(err){
            console.log("Error: ", err);
        }
    }
    return (
        <>
            <div className="container-fluid px-4">
                <BreadCrumb title="Banner Create" pageTitle="Banner Create" addBtn={true}  page="Banner" />
                <div className="card mb-4">
                    <div className="card-body">
                        <LabelFormComponent onSubmitEvent={handleAddAction} type="banner" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BannerCreatePage;