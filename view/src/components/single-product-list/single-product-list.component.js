// import Button from 'react-bootstrap/Button';
import { Card, Badge, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { NumericFormat } from 'react-number-format'
export const SingleProductList = ({ data }) => {
    // console.log("data", data)
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.REACT_APP_API_URL+"/assests/"+data.images[0]} />
                <Card.Body>
                    <NavLink to={"/products/"+data.slug} className="product-link">
                        <Card.Title>
                            {data.title} 
                        </Card.Title>
                    </NavLink>
                    <div className="card-text">
                       {
                            data.category && data.category.map((item, index) => (
                                <Badge className="mb-1" bg="info">
                                    <NavLink to={"/category/"+item.slug} className="text-white">
                                        {item.title}
                                    </NavLink>
                                </Badge>
                            ))
                       } 
                    </div>
                    <hr />
                    {
                        <NumericFormat value={data.after_discount} displayType={'text'} thousandSeparator={true} prefix={'NPR. '} />
                    }
                    {
                        data.discount ? 
                        <del className="text-danger">
                            <NumericFormat value={data.price} displayType={'text'} thousandSeparator={true} prefix={'NPR. '} className="mx-2" />
                        </del>: <></>
                    }
                    <Button variant="warning" size="sm">Add to Cart</Button>
                </Card.Body>
            </Card>
        </>
    )
}