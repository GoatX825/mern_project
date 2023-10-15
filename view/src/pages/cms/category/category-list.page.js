import { useEffect, useState } from "react";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import DataTable from 'react-data-table-component';
import { deleteCategoryById, getAllCategories } from "../../../services/category.services";
import { LoadImage } from "../../../components/image-view/load-image.component";
import { ActionButtons } from "../../../components/action-btns/action-btns.component";
import {toast} from 'react-toastify';
const CategoryListPage = () => {

    const deleteCategory = async (id) => {
        try{
            let reply = await deleteCategoryById(id);
            // console.log("reply: ", reply); 
            if(reply.status){
                toast.success(reply.msg); 
                getCategoryData();  
            }else{
                toast.error(reply.msg);
            }
        }catch(err){
            console.error(err);
        }
    }

    const getCategoryData = async () => {
        try{
            let response = await getAllCategories();
            // console.log("response: " , response)
            if(response.status){
                setData(response.result);
            }
        }catch(error){
            console.error("Err: ", error);
        }
    } 

    
    useEffect(() => {
        getCategoryData();
    }, []);

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Parent',
            selector: row => (row.parent ? row.parent.title : '-'),
        },
        {
            name: 'Brand',
            selector: row => (row.title ? row.title : '-'),
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
            selector: row => <ActionButtons id={row._id} handleDelete={deleteCategory} entity="Category" />,
        }
    ];

    let [data, setData] =useState([]);

    return (
        <>
            <div className="container-fluid px-4">
                <BreadCrumb title="Category Page title" pageTitle="Category List" addBtn={true} path="/admin/category/create" page="Category" />
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

export default CategoryListPage;