import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const HeaderComponent = () => {
    let navigate = useNavigate();
    let user = localStorage.getItem('user');
    if(user){
        user = JSON.parse(user);
    }
    const logout = (e) => {
        e.preventDefault(); // prevents redirection
        localStorage.clear();
        navigate('/login');
    }
    return(
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        {
                            user ? <></> : <><NavLink to="/login" className="nav-link">Login</NavLink>
                            <NavLink to="/register" className="nav-link">Register</NavLink></> 
                        }
                        <NavLink to="/contact" className='nav-link'>Contact Us</NavLink>
                    </Nav> 
                    {
                        user ? 
                        <Nav>
                             <NavLink className="nav-link" to="/"> {user.name} </NavLink>
                             <NavLink className="nav-link" to="/" onClick={logout}>Logout</NavLink>
                        </Nav> : <></> 

                    }
                </Container>
            </Navbar>
    )
}

export default HeaderComponent;