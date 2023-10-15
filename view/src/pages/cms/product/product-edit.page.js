import { useNavigate, useParams } from "react-router-dom";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import {  getProductById, updateProduct } from "../../../services/product.services";
import {toast} from 'react-toastify'
import { useEffect, useState } from "react";
import { ProductFormComponent } from "../../../components/cms/product-form.component";
const ProductEditPage = () => {
    let navigate = useNavigate();
 
    let params = useParams();

    let [data, setData] = useState();

    const handleUpdateAction = async (data) => {
        try{
            console.log("Data: ", data);
            let response = await updateProduct(data, params.id);
            if(response.status){
                toast.success(response.msg);
            }else{
                toast.error(response.msg);
            }

            navigate('/admin/product');
        }catch(err){
            console.log("Error: ", err);
        }
    }

    const getProductData = async () => {
        try{
            let response = await getProductById(params.id);
            // console.log("response: ", response)
            if(response.status){
                setData(response.result);
            }
        }catch(eer){
            console.error("error: ", eer);
        }
    }

    useEffect(() => {
        getProductData();
    }, [params])
    
    return (
        <>
            <div className="container-fluid px-4">
                <BreadCrumb title="Product Update" pageTitle="Product Create" addBtn={true}  page="Product" />
                <div className="card mb-4">
                    <div className="card-body">
                        <ProductFormComponent
                        onSubmitEvent={handleUpdateAction} type="Product" data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductEditPage;