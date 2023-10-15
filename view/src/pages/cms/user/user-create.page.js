import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../../components/cms/breadcrumb.component";
import { UsersFormComponent } from "../../../components/cms/user-form.component";
import {toast} from 'react-toastify'
import { registerUser } from "../../../services/user.services";
const UserCreatePage = () => {
    let navigate = useNavigate();
    const handleAddAction = async (data) => {
        try{
            // console.log("Data: ", data);
            let response = await registerUser(data);
            // console.log("response: ", response);
            if(response.status){
                toast.success(response.msg)
                navigate('/admin/users');   
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
                <BreadCrumb title="User Create" pageTitle="User Create" addBtn={true}  page="User" />
                <div className="card mb-4">
                    <div className="card-body">
                        <UsersFormComponent onSubmitEvent={handleAddAction}  edit={false} defaultValue={
                            {name: "",
                            email: "",
                            password: "",
                            role: "",
                            image: ""}
                        }/>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default UserCreatePage;
