import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import { productCreate } from "../../../services/product.services";
import {toast} from 'react-toastify'
import { ProductFormComponent } from "../../../components/cms/product-form.component";
const ProductCreatePage = () => {
    let navigate = useNavigate();
    const handleAddAction = async (data) => {
        try{
            // console.log("Data: ", data);
            let response = await productCreate(data);
            // console.log("response: ", response);
            if(response.status){
                toast.success(response.msg)
                navigate('/admin/product');   
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
                <BreadCrumb title="Product Create" pageTitle="Product Create" addBtn={true}  page="Product" />
                <div className="card mb-4">
                    <div className="card-body">
                        <ProductFormComponent onSubmitEvent={handleAddAction} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCreatePage;