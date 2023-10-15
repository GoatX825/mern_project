import { Col, Container, Row } from "react-bootstrap";
import { SingleProductList } from "../../components/single-product-list/single-product-list.component";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCategory } from "../../services/product.services";

const CategoryList = () => {
    const [all_products, setAllProducts] = useState();
    let params = useParams()

    const get_all_products = async () => {
        try{
           let data = await getProductByCategory(params.slug);
           if(data.result){
            setAllProducts(data.result);
           }
        }catch(e){
            console.error("error: ", e);
        }
    }

    useEffect(() => {
        get_all_products();
    }, [params]);

    return(
        <>
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
    )
}
export default CategoryList;