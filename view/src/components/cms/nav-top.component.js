import { NavLink, useNavigate } from "react-router-dom";

export const NavTopComponent = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <NavLink className="navbar-brand ps-3" href="/admin">Admin Panel</NavLink>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
            <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            </div>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i>
                    {user.name}</a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="/login" onClick={logout}>Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}