import { useEffect, useState } from "react";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import DataTable from 'react-data-table-component';
import { deleteBrandById, getAllBrands } from "../../../services/brand.services";
import { LoadImage } from "../../../components/image-view/load-image.component";
import { ActionButtons } from "../../../components/action-btns/action-btns.component";
import {toast} from 'react-toastify';
const BrandListPage = () => {

    const deleteBrand = async (id) => {
        try{
            let reply = await deleteBrandById(id);
            // console.log("reply: ", reply); 
            if(reply.status){
                toast.success(reply.msg); 
                getBrandData();  
            }else{
                toast.error(reply.msg);
            }
        }catch(err){
            console.error(err);
        }
    }

    const getBrandData = async () => {
        try{
            let response = await getAllBrands();
            // console.log("response: " , response)
            if(response.status){
                setData(response.result);
            }
        }catch(error){
            console.error("Err: ", error);
        }
    } 

    
    useEffect(() => {
        getBrandData();
    }, []);

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
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
            selector: row => <ActionButtons id={row._id} handleDelete={deleteBrand} entity="Brand" />,
        }
    ];

    let [data, setData] =useState([]);

    return (
        <>
            <div className="container-fluid px-4">
                <BreadCrumb title="Brand Page title" pageTitle="Brand List" addBtn={true} path="/admin/brand/create" page="Brand" />
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

export default BrandListPage;