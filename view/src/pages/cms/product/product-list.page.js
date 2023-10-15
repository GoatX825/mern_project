import { useEffect, useState } from "react";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import DataTable from 'react-data-table-component';
import { deleteProductById, getAllProducts } from "../../../services/product.services";
import { LoadImage } from "../../../components/image-view/load-image.component";
import { ActionButtons } from "../../../components/action-btns/action-btns.component";
import {toast} from 'react-toastify';
import { BrandShow } from "../../../components/brands/brands.component";
import {NumericFormat} from 'react-number-format'
const ProductListPage = () => {

    const deleteProduct = async (id) => {
        try{
            let reply = await deleteProductById(id);
            // console.log("reply: ", reply); 
            if(reply.status){
                toast.success(reply.msg); 
                getProductData();  
            }else{
                toast.error(reply.msg);
            }
        }catch(err){
            console.error(err);
        }
    }

    const getProductData = async () => {
        try{
            let response = await getAllProducts();
            // console.log("response: " , response)
            if(response.status){
                setData(response.result);
            }
        }catch(error){
            console.error("Err: ", error);
        }
    } 

    
    useEffect(() => {
        getProductData();
    }, []);

    // const columns = [];
    
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Category',
            selector: row => (row.category  ? <BrandShow data={row.category} /> : '-'),
        },
        {
            name: 'Price',
            selector: row => (row.price ?  <NumericFormat value={row.after_discount} displayType={'text'} thousandSeparator={true} prefix={'NPR. '} /> : "-"),
        },
        {
            name: 'Brand',
            selector: row => row.brand,
        },
        {
            name: 'Image',
            selector: row => <>{row.image ? <LoadImage src={row.image} /> : "-"} </>
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Action',
            selector: row => <ActionButtons id={row._id} handleDelete={deleteProduct} entity="Product" />,
        }
    ];
    
    let [data, setData] =useState([]);
    // console.log("datas------->", data);


    return (
        <>
            <div className="container-fluid px-4">
                <BreadCrumb title="Product Page title" pageTitle="Product List" addBtn={true} path="/admin/product/create" page="Product" />
                <div className="card mb-4">
                    <div className="card-body">
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductListPage;