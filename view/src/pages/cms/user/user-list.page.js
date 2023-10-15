import { useEffect, useState } from "react";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import DataTable from 'react-data-table-component';
import { deleteUserById, getAllUsers } from "../../../services/users.services";
import { ActionButtons } from "../../../components/action-btns/action-btns.component";
import {toast} from 'react-toastify';
const UsersListPage = () => {

    const deleteUser = async (id) => {
        try{
            let reply = await deleteUserById(id);
            // console.log("reply: ", reply); 
            if(reply.status){
                toast.success(reply.msg); 
                getUserData();  
            }else{
                toast.error(reply.msg);
            }
        }catch(err){
            console.error(err);
        }
    }

    const getUserData = async () => {
        try{
            let localUser = JSON.parse(localStorage.getItem('user'));
            let response = await getAllUsers();
            // console.log("response: " , response)
            if(response.status){
                let all_users = response.result;
                all_users = all_users.filter((item) => localUser.id !== item._id);
                setData(all_users)
            }
            // if(response.status){
            //     setData(response.result);
            // }
        }catch(error){
            console.error("Err: ", error);
        }
    } 

    
    useEffect(() => {
        getUserData();
    }, []);

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Action',
            selector: row => <ActionButtons id={row._id} handleDelete={deleteUser} entity="User" />,
        }
    ];

    let [data, setData] =useState([]);

    return (
        <>
            <div className="container-fluid px-4">
                <BreadCrumb title="User Page title" pageTitle="User List" addBtn={true} path="/admin/user/create" page="User" />
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

export default UsersListPage;