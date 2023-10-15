import { useParams, useSearchParams } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap'
import {SliderComponent} from '../../components/slider/slider.component'
import { useState } from "react";
const ProductDetail = () => {
    // /prouct/proudct_id(param) :: http://localhost:3000/product/1234
    let param = useParams();
    let proudct_id = param.slug;


    // /proudct/product_id?id=test(query_string)    :: http://localhost:3000/product/1234?id=GoatX
    let [query] = useSearchParams();
    let query_value = query.get('id');

    let [sliderData, setSliderData] = useState([
{
    image: "1695099327725-redmi note.jpg",
    link: "#"
},
{
    image: "1695099327719-redmi note 12 4g.png",
    link: "#"
},
{
    image: "1695099327719-redmi note 12 4g.png" ,
    link: "#"
},
{
    image: "1695099327725-redmi note.jpg",
    link: "#"
},
{
    image: "1695099327727-Redmi Note 12 4G.jpg",
    link: "#"
}
])
    return(
        <>
            {proudct_id}
            {query_value}
            <Container>
                <Row>
                    <Col>
                      <SliderComponent data={sliderData} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductDetail;  