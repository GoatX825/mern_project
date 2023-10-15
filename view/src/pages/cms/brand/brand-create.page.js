import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import { LabelFormComponent } from "../../../components/cms/label-form.component";
import { brandCreate } from "../../../services/brand.services";
import {toast} from 'react-toastify'
const BrandCreatePage = () => {
    let navigate = useNavigate();
    const handleAddAction = async (data) => {
        try{
            // console.log("Data: ", data);
            let response = await brandCreate(data);
            // console.log("response: ", response);
            if(response.status){
                toast.success(response.msg)
                navigate('/admin/brand');   
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
                <BreadCrumb title="Brand Create" pageTitle="Brand Create" addBtn={true}  page="Brand" />
                <div className="card mb-4">
                    <div className="card-body">
                        <LabelFormComponent onSubmitEvent={handleAddAction} type="brand" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BrandCreatePage;