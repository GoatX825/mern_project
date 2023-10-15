import { NavLink } from "react-router-dom"

export const BreadCrumb = ({title, pageTitle, addBtn, path, page}) => {
    return (
        <>
            <h1 className="mt-4"> {title}
            {
                addBtn &&
                <NavLink className="btn btn-sm btn-success float-end mt-4" to={path}>
                    <i className="fa fa-plus"></i> Add {page}
                </NavLink>
            }</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">
                    <NavLink href="/admin">Dashboard</NavLink></li>
                <li className="breadcrumb-item active">{pageTitle} </li>
            </ol>
           
        </>
    )
}