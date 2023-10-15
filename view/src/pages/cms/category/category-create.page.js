import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import { categoryCreate } from "../../../services/category.services";
import {toast} from 'react-toastify'
import { CategoryFormComponent } from "../../../components/cms/category-form.component";
const CategoryCreatePage = () => {
    let navigate = useNavigate();
    const handleAddAction = async (data) => {
        try{
            // console.log("Data: ", data);
            let response = await categoryCreate(data);
            // console.log("response: ", response);
            if(response.status){
                toast.success(response.msg)
                navigate('/admin/category');   
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
                <BreadCrumb title="Category Create" pageTitle="Category Create" addBtn={true}  page="Category" />
                <div className="card mb-4">
                    <div className="card-body">
                        <CategoryFormComponent onSubmitEvent={handleAddAction} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryCreatePage;