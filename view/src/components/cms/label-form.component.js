import { useFormik } from "formik"
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import * as Yup from 'yup';

export const LabelFormComponent = ({ onSubmitEvent, type, data = null }) => {
    let validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required."),
        link: Yup.string().nullable(),
        status: Yup.string()
    })
    let formik = useFormik({
        initialValues: {
            title: null,
            link: null,
            image: null,
            status: null,
            type: type

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmitEvent(values);
            // console.log("Values: ", values);
        }
    })

    // console.log("Formik: ", data, formik.values, formik.initialValues);

    useEffect(() => {
        if (data) {
            formik.setValues({
                ...data,
                image: null
            })
        }
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