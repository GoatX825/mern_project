import { useFormik } from "formik"
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { getAllCategories } from "../../services/category.services";
import { getAllBrands } from "../../services/brand.services";
import Select from 'react-select'

export const CategoryFormComponent = ({ onSubmitEvent, data = null }) => {
    let [parent_cats, setParentCats] = useState()
    let [all_brands, setAllBrands] = useState([])

    let validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required."),
        parent: Yup.string(),
        status: Yup.string()
    })
    let formik = useFormik({
        initialValues: {
            title: null,
            parent: null,
            brand: null,
            image: null,
            status: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmitEvent(values);
            if(values.brand){
                values.brand  = values.brand.map((item) => item.value);
            }
            console.log("Values: ", values);
        }
    })

    // console.log("Formik: ", data, formik.values, formik.initialValues);

    let getCategories = async () => {
        try{
            let result = await getAllCategories();
            setParentCats(result.result);
        }catch(error){
            console.log("error: ", error);
        }
    }

    let getBrands = async () => {
        try{
            let result = await getAllBrands();
            console.log(result);
            let brands = result.result.map((item) =>{
                return{
                    label: item.title,
                    value: item._id
                }
            })
            
            setAllBrands(brands);

        }catch(err){
            console.error("Brand Fetcher error: ", err);
        }
    }

    useEffect(() => {
        getCategories();
        getBrands();
    
        let selec_brand = data.brand.map((item) => ({
            label: item.title,
            value: item._id
        }));
        
        formik.setValues({
            ...data,
            image: null,
            parent: data.parent._id,
            brand: selec_brand
        });
    }, [data]);
    

    // console.log("Formik: ", formik.values)
    // console.log("formikError: ", formik.errors)
    return (
        <>
            <Row>
                <Col sm={12} md={12} className="my-1">
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="row mb-3" controlId="title">
                            <Form.Label className="col-sm-3" >Title:</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" size="sm" name="title" onChange={formik.handleChange} value={formik.values.title || ""} placeholder="Enter Your title....." />
                                {
                                    formik.errors.title && formik.touched.title ? (
                                        <em className="text-danger">{formik.errors.title}</em>
                                    ) : null
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3" controlId="parent">
                            <Form.Label className="col-sm-3" >Parent:</Form.Label>
                            <Col sm={9}>
                                <Form.Select size="sm" name="parent" onChange={formik.handleChange} required value={formik.values.parent || ""} >
                                    <option>---Select Any One---</option>
                                    {
                                        parent_cats && parent_cats.map((item) => (
                                            <option value={item._id}>
                                                {
                                                    item.title 
                                                }
                                            </option>
                                        ))
                                    }
                                </Form.Select>
                                {
                                    formik.errors.parent && formik.touched.parent ? (
                                        <em className="text-danger">{formik.errors.parent}</em>
                                    ) : null
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3" controlId="brand">
                            <Form.Label className="col-sm-3" >Brand:</Form.Label>
                            <Col sm={9}>

                                <Select isMulti={true} size="sm" options={all_brands} name="brand" onChange={(e) => {
                                    formik.setValues({
                                        ...formik.values,
                                        brand: e
                                    })
                                }} value={formik.values.brand || ""} required ></Select>

                                {/* <Form.Select size="sm" name="brand" onChange={formik.handleChange} required value={formik.values.brand || ""} >
                                    <option>---Select Any One---</option>
                                    
                                </Form.Select> */}
                                {
                                    formik.errors.brand && formik.touched.brand ? (
                                        <em className="text-danger">{formik.errors.brand}</em>
                                    ) : null
                                }
                            </Col>
                        </Form.Group>
                        {
                            formik.values.type === "banner" ? <>
                                <Form.Group className="row mb-3" controlId="link">
                                    <Form.Label className="col-sm-3" >Link:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control size="sm" type="url" name="link" onChange={formik.handleChange} value={formik.values.link || ""} placeholder="Enter Your link....." />
                                        {
                                            formik.errors.link && formik.touched.link ? (
                                                <em className="text-danger">{formik.errors.link}</em>
                                            ) : null
                                        }
                                    </Col>
                                </Form.Group></> : <></>
                        }

                        <Form.Group className="row mb-3" controlId="status">
                            <Form.Label className="col-sm-3" >Status:</Form.Label>
                            <Col sm={9}>
                                <Form.Select size="sm" name="status" onChange={formik.handleChange} required value={formik.values.status || ""} >
                                    <option>---Select Any One---</option>
                                    <option value='active'>Active</option>
                                    <option value="inactive">In-Active</option>
                                </Form.Select>
                                {
                                    formik.errors.status && formik.touched.status ? (
                                        <em className="text-danger">{formik.errors.status}</em>
                                    ) : null
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3" controlId="image">
                            <Form.Label className="col-sm-3" >Image:</Form.Label>
                            <Col sm={3}>
                                <Form.Control type="file" name="image" size="sm" onChange={(e) => {
                                    // ...
                                    formik.setValues({
                                        ...formik.values,
                                        image: e.target.files[0]
                                    })

                                }} />
                                {
                                    formik.errors.image && formik.touched.image ? (
                                        <em className="text-danger">{formik.errors.image}</em>
                                    ) : null
                                }
                            </Col>
                            <Col sm={3}>
                                {
                                    formik.values.image ? (
                                        <img className="img img-fluid" alt="" src={formik.values.image && URL.createObjectURL(formik.values.image)} />
                                    ) : (
                                        data && data.image ? (
                                            <img className="img img-fluid" alt="" src={process.env.REACT_APP_API_URL+"/assets/"+data.image} />
                                        ) : ''
                                    )
                                }

                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Col sm={{ offset: 3, span: 3 }}>
                                <Button variant="success" type="submit" size="sm">
                                    Submit
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </>
    )
}