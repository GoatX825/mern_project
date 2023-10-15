import { useNavigate, useParams } from "react-router-dom";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import { UsersFormComponent } from "../../../components/cms/user-form.component";
import {  getUserById, updateUser } from "../../../services/users.services";
import {toast} from 'react-toastify'
import { useCallback, useEffect, useState } from "react";
const UsersEditPage = () => {
    let navigate = useNavigate();
 
    let params = useParams();

    let [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        image: "" 
    });

    const handleUpdateAction = async (data) => {
        try{
            // console.log("Data: ", data);
            let response = await updateUser(data, params.id);
            if(response.status){
                toast.success(response.msg);
            }else{
                toast.error(response.msg);
            }

            navigate('/admin/users');
        }catch(err){
            console.log("Error: ", err);
        }
    }

    const getUserData = useCallback(async () => {
        try{
            let response = await getUserById(params.id);
            // console.log("response: ", response)
            if(response.status){
                setData(response.result);
            }
        }catch(eer){
            console.error("error: ", eer);
        }
    },[params])

    useEffect(() => {
        getUserData();
    }, [getUserData])
    
    return (
        <>
            <div className="container-fluid px-4">
                <BreadCrumb title="User Update" pageTitle="User Update Page" addBtn={true}  page="User" />
                <div className="card mb-4">
                    <div className="card-body">
                        <UsersFormComponent
                        onSubmitEvent={handleUpdateAction} edit={true} defaultValue={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsersEditPage;