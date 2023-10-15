import 'bootstrap'  // to use bootstrap feature we need  bootstrap of jQuery
import '../../assests/css/admin.css';
import { Outlet } from 'react-router-dom';
import { NavTopComponent } from '../../components/cms/nav-top.component';
import { SidebarComponent } from '../../components/cms/sidebar.component';
import '@fortawesome/fontawesome-free/css/all.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminLayout = () => {
    return (
        <>
            <NavTopComponent/>
            <ToastContainer/>
            <div id="layoutSidenav">    
                <div id="layoutSidenav_nav">
                    <SidebarComponent/>
                </div>  
                <div id="layoutSidenav_content">
                    <main>
                        {/* Outlet means Section / content  */}
                        <Outlet/>
                    </main>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Your Website 2023</div>
                                <div>
                                    <a href="/">Privacy Policy</a>
                                    &middot;
                                    <a href="/">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default AdminLayout;
