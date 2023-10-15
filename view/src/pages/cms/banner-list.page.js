import { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/cms/breadcrumb.component";
import DataTable from 'react-data-table-component';
import { deleteBannerById, getAllBanners } from "../../services/banner.services";
import { LoadImage } from "../../components/image-view/load-image.component";
import { ActionButtons } from "../../components/action-btns/action-btns.component";
import {toast} from 'react-toastify';
const BannerListPage = () => {

    const deleteBanner = async (id) => {
        try{
            let reply = await deleteBannerById(id);
            // console.log("reply: ", reply); 
            if(reply.status){
                toast.success(reply.msg); 
                getBannerData();  
            }else{
                toast.error(reply.msg);
            }
        }catch(err){
            console.error(err);
        }
    }

    const getBannerData = async () => {
        try{
            let response = await getAllBanners();
            // console.log("response: " , response)
            if(response.status){
                setData(response.result);
            }
        }catch(error){
            console.error("Err: ", error);
        }
    } 

    
    useEffect(() => {
        getBannerData();
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
            selector: row => <ActionButtons id={row._id} handleDelete={deleteBanner} entity="banner" />,
        }
    ];

    let [data, setData] =useState([]);

    return (
        <>
            <div className="container-fluid px-4">
                <BreadCrumb title="Banner Page title" pageTitle="Banner List" addBtn={true} path="/admin/banner/create" page="Banner" />
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

export default BannerListPage;