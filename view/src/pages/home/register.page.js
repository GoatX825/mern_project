import { Button, Col, Container, Form, Row } from "react-bootstrap";
import HeaderComponent from "../../components/header/header.component";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import { registerUser } from "../../services/user.services";

const RegisterPage = () => {
    let registerSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "Name too Short!")
            .max(50, "Name too Long!")
            .required("Name field is required"),
        email: Yup.string().email("Invalid email format").required("Email field is required"),
        password: Yup.string().min(8, 'Password should be at least 8 characters long').required('Password field is required'),
        role: Yup.string().required("Role field is required")
    });

    // useNavigate() hook for navigation or redirection 
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            // data
            name: "",
            email: "",
            password: "",
            role: "",
            image: "",
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            try {
                await registerUser(values);
                toast.success("User registered successfully.");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                // error notification 
                toast.error(error.message);
            }
            

        }

    });
    

    return (
        <>
            <HeaderComponent />
            <ToastContainer/>
            <Container fluid className="mt-1">
                <Row>
                    <Col lg={{ offset: 3, span: 6 }} className="my-1">
                        <h5 className="text-center">Register Page</h5>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={{ offset: 3, span: 6 }} className="my-1">
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" onChange={formik.handleChange}  value={formik.values.name}  placeholder="Enter Your name" size="sm" />
                                {
                                    formik.errors.name && formik.touched.name ? (
                                        <em className="text-danger">{formik.errors.name}</em>
                                    ) : null
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" onChange={formik.handleChange}  value={formik.values.email} placeholder="Enter your email" size="sm"/>
                                {
                                    formik.errors.email && formik.touched.email ? (
                                        <em className="text-danger">{formik.errors.email}</em>
                                    ) : null
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={formik.handleChange}  value={formik.values.password}
                                    placeholder="Enter password"
                                    size="sm"
                                />
                                {
                                    formik.errors.password && formik.touched.password ? (
                                        <em className="text-danger">{formik.errors.password}</em>
                                    ) : null
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    size="sm"
                                    onChange={formik.handleChange}  value={formik.values.role}
                                    name="role"
                                >
                                    <option>Choose a role</option>
                                    <option value="admin">Admin</option>
                                    <option value="seller">Seller</option>
                                    <option value="customer">Customer</option>
                                    <option value="user">User</option>
                                </Form.Select>
                                {
                                    formik.errors.role && formik.touched.role ? (
                                        <em className="text-danger">{formik.errors.role}</em>
                                    ) : null
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formFileSm">
                                <Form.Label>Choose an image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    size="sm"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            &nbsp;   Or   &nbsp;
                            <Link to="/login">Login</Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default RegisterPage;
