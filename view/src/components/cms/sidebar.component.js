import { NavLink } from "react-router-dom";

export const SidebarComponent = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user) {

    }
    return (
        <>
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <NavLink className="nav-link" to="/admin">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </NavLink>
                        <NavLink className="nav-link" to="/admin/banner">
                            <div className="sb-nav-link-icon"><i className="fas fa-images"></i></div>
                            Banner
                        </NavLink>
                        <NavLink className="nav-link" to="/admin/brand">
                            <div className="sb-nav-link-icon"><i className="fa-solid fa-bolt-lightning"></i></div>
                            Brand
                        </NavLink>
                        <NavLink className="nav-link" to="/admin/category">
                            <div className="sb-nav-link-icon"><i className="fas fa-sitemap"></i></div>
                            Category
                        </NavLink>
                        <NavLink className="nav-link" to="/admin/users">
                            <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                            User
                          </NavLink>
                        <NavLink className="nav-link" to="/admin/product">
                            <div className="sb-nav-link-icon"><i className="fas fa-shopping-bag"></i></div>
                            Products
                        </NavLink>
                        <NavLink className="nav-link" to="/admin/orders">
                            <div  Name="sb-nav-link-icon"><i className="fas fa-shopping-cart"></i></div>
                            Orders
                        </NavLink>
                        <NavLink className="nav-link" to="/admin/transactions">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-rupee-sign"></i></div>
                            Payments
                        </NavLink>
                        <NavLink className="nav-link" to="review">
                            <div className="sb-nav-link-icon"><i className="fas fa-comments"></i></div>
                            Review
                        </NavLink>
                        <NavLink className="nav-link" to="/admin/settings">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-gears"></i></div>
                            Settings
                        </NavLink>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    {user.name}
                </div>
            </nav>
        </>
    )
}