import {Carousel} from 'react-bootstrap';
export const SliderComponent = ({ data }) => {
    return (
        <>
            <Carousel>
                {
                    data && data.map((item, index) => (
                        <Carousel.Item key={index}>
                           <a href={item.link}>
                                <img
                                    className='d-block w-100'
                                    src={process.env.REACT_APP_API_URL+'/assests/'+item.image}
                                    alt='First slide'
                                />
                           </a>
                            {/* <Carousel.Caption>
                            </Carousel.Caption> */}
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </>
    )
}