import "../../assests/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "../../components/header/header.component";
import { Button, Col, Container, Form,  Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmailInput, PasswordInput } from "../../components/input/input.component";
import { postRequest } from "../../services/axios.services";
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const LoginPage = () => {
    let navigate = useNavigate();

    let [data, setData]  = useState({
        username: '',
        password: '',
        remember_me: false
    })
    // console.log("Form Data: ", data)

    const handleChange = (e) => {
        let {name, value}  =  e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let response = await postRequest('/auth/login', data);
            // console.log("User: ", user);
            if(response.result.token){
                toast.success("User logged in successfully");
                localStorage.setItem('token', response.result.token);
                let user_info = {
                    name: response.result.user.name,
                    email: response.result.user.email,
                    role: response.result.user.role,
                    id: response.result.user._id 
                }

                let user_data = JSON.stringify(user_info);
                localStorage.setItem('user', user_data);        // don't put "user: "
                
                setTimeout(() => {
                    navigate("/"+user_info.role);
                }, 2000);
            }
        }catch(err){
            toast.error(err.message); 

        }
    }

    useEffect(() => {
        let user = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        if(token && user) {
            user = JSON.parse(user);
            navigate('/'+user.role)
        }
    }, [navigate]);

    return (
        
        <>
            <HeaderComponent/>
            <ToastContainer/>
            {/*  react-bootstrap components  */}
            <Container fluid>
                <Row>
                    <Col lg={{ offset: 3, span: 6 }} className="my-5">
                        <h5 className="text-center">Login Page</h5>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={{ offset: 3, span: 6 }} className="my-1">
                        <Form onSubmit={handleSubmit}>
                           
                            <EmailInput fieldname="Username: " name="username" placeholder="Enter your username" handleChange={handleChange} />

                            <PasswordInput fieldname="Password: " name="password" placeholder="Enter your password" handleChange={handleChange} />
                            
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember Me" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            {/* &nbsp;
                            &nbsp; */}
                            {" "}
                            
                            Or
                            {/* &nbsp;  
                            &nbsp; */}
                            {" "}
                            
                        <Link to="/register">Register</Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;
