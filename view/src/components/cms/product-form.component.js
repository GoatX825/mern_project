import { useFormik } from "formik"
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { getAllCategories } from "../../services/category.services";
import { getAllBrands } from "../../services/brand.services";
import Select from 'react-select'
import { getAllUsers } from "../../services/users.services";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export const ProductFormComponent = ({ onSubmitEvent, data = null }) => {
    let [parent_cats, setParentCats] = useState()
    let [all_brands, setAllBrands] = useState([])
    let [all_sellers, setAllSellers] = useState()

    let validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required."),
        category: Yup.array().of(
            Yup.object().nullable()
        ),
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
            let data = values;
            if (data.brand) {
                data.brand = data.brand.value;
            }
            if (data.category) {
                data.category = data.category.map((item) => item.value);
            }

            if (data.seller) {
                data.seller = data.seller.value;
            }
            onSubmitEvent(values);
            // console.log("Data: ", data);
        }
    })

    // console.log("Formik: ", data, formik.values, formik.initialValues);

    let getCategories = async () => {
        try {
            let result = await getAllCategories();
            let cats = result.result.map((item) => {
                return {
                    label: item.title,
                    value: item._id
                }
            })
            setParentCats(cats);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    let getBrands = async () => {
        try {
            let result = await getAllBrands();
            console.log(result);
            let brands = result.result.map((item) => {
                return {
                    label: item.title,
                    value: item._id
                }
            })

            setAllBrands(brands);

        } catch (err) {
            console.error("Brand Fetcher error: ", err);
        }
    }

    let getAllSellers = async () => {
        try {
            let all_users = await getAllUsers();
            // console.log(all_users);
            let sellers = all_users.result.filter((user) => user.role === 'seller');
            sellers = sellers.map((item) => {
                return {
                    label: item.name,
                    value: item._id
                }
            })
            setAllSellers(sellers);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCategories();
        getBrands();
        getAllSellers();

        let selec_brand = data?.brand?.map((item) => ({
            label: item.title,
            value: item._id
        }));

        formik.setValues({
            ...data,
            image: null,
            parent: data?.parent._id,
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

                        <Form.Group className="row mb-3" controlId="summary">
                            <Form.Label className="col-sm-3" >Summary:</Form.Label>
                            <Col sm={9}>
                                <Form.Control as="textarea" rows={4} size="sm" name="summary" onChange={formik.handleChange} value={formik.values.summary || ""}
                                    style={{ resize: "none" }}
                                    placeholder="Enter Your summary....." />
                                {
                                    formik.errors.summary && formik.touched.summary ? (
                                        <em className="text-danger">{formik.errors.summary}</em>
                                    ) : null
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3" controlId="description">
                            <Form.Label className="col-sm-3" >Description:</Form.Label>
                            <Col sm={9}>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={formik.values.description}
                                    name="description"
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        formik.setValues({
                                            ...formik.values,
                                            description: data

                                        })
                                    }}
                                />

                                {
                                    formik.errors.description && formik.touched.description ? (
                                        <em className="text-danger">{formik.errors.description}</em>
                                    ) : null
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3" controlId="category">
                            <Form.Label className="col-sm-3" >Catetory:</Form.Label>
                            <Col sm={9}>
                                <Select isMulti={true} size="sm" options={parent_cats} name="brand" onChange={(e) => {
                                    formik.setValues({
                                        ...formik.values,
                                        category: e 
                                    })
                                }} value={formik.values.category || []} required ></Select>
                                


                                {
                                    formik.errors.category && formik.touched.category ? (
                                        <em className="text-danger">{formik.errors.category}</em>
                                    ) : null
                                }
                            </Col>
                        </Form.Group>

                        <Form.Group className="row mb-3" controlId="price">
                            <Form.Label className="col-sm-3" >Price(Rs.):</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" min={1} required size="sm" name="price" onChange={formik.handleChange} value={formik.values.price || ""} placeholder="Enter Your price....." />
                                {
                                    formik.errors.price && formik.touched.price ? (
                                        <em className="text-danger">{formik.errors.price}</em>
                                    ) : null
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3" controlId="discount">
                            <Form.Label className="col-sm-3" >Discount(%):</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" min={0} required size="sm" name="discount" onChange={formik.handleChange} value={formik.values.discount || ""} placeholder="Enter Your discount....." />
                                {
                                    formik.errors.discount && formik.touched.discount ? (
                                        <em className="text-danger">{formik.errors.discount}</em>
                                    ) : null
                                }
                            </Col>
                        </Form.Group>

                        <Form.Group className="row mb-3" controlId="is_featured">
                            <Form.Label className="col-sm-3" >Is Featured</Form.Label>
                            <Col sm={9}>
                                <Form.Check
                                    type="checkbox"
                                    label={'Yes'}
                                    onChange={formik.handleChange}
                                    value={1}
                                />
                                {
                                    formik.errors.is_featured && formik.touched.is_featured ? (
                                        <em className="text-danger">{formik.errors.is_featured}</em>
                                    ) : null
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3" controlId="brand">
                            <Form.Label className="col-sm-3" >Brand:</Form.Label>
                            <Col sm={9}>

                                <Select size="sm" options={all_brands} name="brand" onChange={(e) => {
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

                        <Form.Group className="row mb-3" controlId="seller">
                            <Form.Label className="col-sm-3" >Seller:</Form.Label>
                            <Col sm={9}>

                                <Select isMulti={true} size="sm" options={all_sellers} name="seller" onChange={(e) => {
                                    formik.setValues({
                                        ...formik.values,
                                        seller: e
                                    })
                                }} value={formik.values.seller || ""} required ></Select>

                                {
                                    formik.errors.seller && formik.touched.seller ? (
                                        <em className="text-danger">{formik.errors.seller}</em>
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
                                <Form.Control multiple type="file" name="image" size="sm" onChange={(e) => {
                                    // ...
                                    formik.setValues({
                                        ...formik.values,
                                        image: Object.values(e.target.files)
                                    })

                                }} />
                                {
                                    formik.errors.image && formik.touched.image ? (
                                        <em className="text-danger">{formik.errors.image}</em>
                                    ) : null
                                }
                            </Col>

                        </Form.Group>
                        <Row className="mb-3">
                            {
                                formik.values.image && formik.values.image.map((img, index) => (
                                    <Col sm={3} key={index}>
                                        {
                                            typeof (img) !== 'string' ?
                                                <img className="img img-fluid img-thumbnail" alt="" src={URL.createObjectURL(img)} />
                                                :
                                                <img className="img img-fluid" alt="" src={process.env.REACT_APP_API_URL + "/assests/" + img} />

                                        }
                                    </Col>
                                ))
                            }
                        </Row>
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