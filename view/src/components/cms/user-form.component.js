import { Button,Col,Form } from "react-bootstrap";
import { useFormik } from "formik";
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import { useEffect } from "react";
export const UsersFormComponent = ({onSubmitEvent, defaultValue, edit}) => {
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
    const formik = useFormik({
        initialValues: defaultValue,
        validationSchema: registerSchema,
        onSubmit: async (values) => {
                onSubmitEvent(values)
        }

    });

    useEffect(() => {
        if(defaultValue){
            formik.setValues(defaultValue);
        }
    }, [defaultValue])

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="row mb-3" controlId="name">
                    <Form.Label className="col-sm-3">Name</Form.Label>
                        <Col sm={9}>
                        <Form.Control name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Enter Your name" size="sm" />
                    {
                        formik.errors.name && formik.touched.name ? (
                            <em className="text-danger">{formik.errors.name}</em>
                        ) : null
                    }
                        </Col>
                    
                </Form.Group>
                <Form.Group className="row mb-3" controlId="formBasicEmail">
                    <Form.Label className="col-sm-3">Email address</Form.Label>
                    <Col sm={9}>
                    <Form.Control name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Enter your email" size="sm" 
                    readOnly={edit} />
                    {
                        formik.errors.email && formik.touched.email ? (
                            <em className="text-danger">{formik.errors.email}</em>
                        ) : null
                    }</Col>
                </Form.Group>
                {
                    !edit && <Form.Group className="row mb-3" controlId="formBasicPassword">
                    <Form.Label className="col-sm-3" >Password</Form.Label>
                    <Col sm={9}>
                    <Form.Control
                        type="password"
                        name="password"
                        onChange={formik.handleChange} value={formik.values.password}
                        placeholder="Enter password"
                        size="sm"
                    />
                    {
                        formik.errors.password && formik.touched.password ? (
                            <em className="text-danger">{formik.errors.password}</em>
                        ) : null
                    }
                    </Col>
                </Form.Group>
                }
                <Form.Group className="row mb-3" controlId="role">
                    <Form.Label className="col-sm-3">Role</Form.Label>
                    <Col sm={9}>
                    <Form.Select
                        aria-label="Default select example"
                        size="sm"
                        onChange={formik.handleChange} value={formik.values.role}
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
                    </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="formFileSm">
                    <Form.Label className="col-sm-3">Choose an image</Form.Label>
                    <Col sm={2}>
                    <Form.Control
                        type="file"
                        name="image"
                        accept="image/*"
                        size="sm"
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                image: e.target.files[0]
                            })
                        }}
                    />
                    </Col>
                    <Col sm={4}>
                        {
                            formik.values.image && typeof(formik.values.image) === "string" ? 
                            <img className="img img-fluid" src={process.env.REACT_APP_API_URl+"/assests/"+formik.values.image} alt="" /> :
                            <img className="img img-fluid" src={formik.values.image && URL.createObjectURL(formik.values.image)} alt="" /> 
                        }
                    </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="submit">
                    <Col sm={{offset:3, span: 9}}>
                        <Button variant="danger" size="sm" type="reset" className="me-2">
                            <i className="fa fa-trash"></i>Cancel
                        </Button>
                        <Button variant="success" size="sm" type="submit" >
                            <i className="fa fa-paper-plane"></i>Register
                        </Button>
                    </Col>

                </Form.Group>
              
            </Form>
        </>
      
    );
};

