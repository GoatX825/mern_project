import { Col, Container, Row } from "react-bootstrap";
import HeaderComponent from "../../components/header/header.component";
import { SliderComponent } from "../../components/slider/slider.component";
import { getAllActiveBanners } from '../../services/banner.services';
import { useEffect, useState } from 'react';
import '../../assests/css/main.css';
import { getAllCategories } from "../../services/category.services";
import { getAllActiveBrands } from "../../services/brand.services";
import { SingleImageTextComponent } from "../../components/single-image-text/single-image-text.component";
import { getAllActiveProducts } from "../../services/product.services";
import { SingleProductList } from "../../components/single-product-list/single-product-list.component";
const HomePage = (props) => {

    const [all_banners, setAllBanners] = useState();
    const [all_cats, setAllCats] = useState();
    const [all_brands, setAllBrands] = useState();
    const [all_products, setAllProducts] = useState();

    const getBanners = async () => {
        try {
            let data = await getAllActiveBanners();
            // console.log("data:", data);
            if (data) {
                setAllBanners(data.result);
            }
        } catch (err) {

        }
    }

    const getCategories = async () => {
        try {
            let data = await getAllCategories();
            if (data.result) {
                let active_cats = data.result.filter((item) => item.status === 'active');
                setAllCats(active_cats);
            }

        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const getBrands = async () => {
        try {
            let data = await getAllActiveBrands();
            if (data.result) {
                setAllBrands(data.result);
            }

        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const getProducts = async () => {
        try{
            let data = await getAllActiveProducts();
            if(data.result){
                setAllProducts(data.result);
            }
        }catch(err){
            console.error('Error: ', err);
        }
    }

    useEffect(() => {
        getBanners();
        getCategories();
        getBrands();
        getProducts();
    }, [])

    return (
        // JSX
        <>
           
            {
                all_banners && <SliderComponent data={all_banners} />
            }

            <Container className="my-5">
                <Row>
                    <Col>
                        <h1>Category</h1>
                        <hr />
                    </Col>
                </Row>
                <Row className="my-3">
                    {
                        all_cats && all_cats.map((item, index) => (
                            <Col sm={6} md={2} key={index}>
                               <SingleImageTextComponent data={item} type="category" />
                            </Col>
                        ))
                    }
                </Row>
            </Container>

            <Container className="my-5">
                <Row>
                    <Col>
                        <h1>Brand</h1>
                        <hr />
                    </Col>
                </Row>
                <Row className="my-3">
                    {
                        all_brands && all_brands.map((item, index) => (
                            <Col sm={6} md={2} key={index}>
                               <SingleImageTextComponent data={item} type="brand" />
                            </Col>
                        ))
                    }
                </Row>
            </Container>

            <Container className="my-5">
                <Row>
                    <Col>
                        <h1>All Products</h1>
                        <hr />
                    </Col>
                </Row>
                <Row className="my-3">
                    {
                        all_products && all_products.map((item, index) => (
                            <Col sm={6} md={3} className="mb-3" key={index}>
                               <SingleProductList data={item} />
                            </Col>  
                        ))
                    }
                </Row>
            </Container>
        </>
    );
};
export default HomePage;
