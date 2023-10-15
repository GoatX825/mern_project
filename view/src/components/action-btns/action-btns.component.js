import { NavLink } from "react-router-dom"
import Swal from 'sweetalert2'
export const ActionButtons = ({id, entity, handleDelete}) => {

    let user_info = JSON.parse(localStorage.getItem('user'));
    const handleDeleteSelf = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
            }
          })
    }
    return(
    <>
        <NavLink className="btn btn-sm btn-info rounded me-1" to={'/'+user_info.role+'/'+entity+'/'+id}>
            <i className="fas fa-pen"/>
        </NavLink>

        <NavLink className="btn btn-sm btn-danger rounded" to='/' onClick={handleDeleteSelf}>
            <i className="fas fa-trash"/>
        </NavLink>
    </>
    )
}