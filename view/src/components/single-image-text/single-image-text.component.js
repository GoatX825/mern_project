import Figure from "react-bootstrap/Figure";
import noImage from "../../assests/images/noImage.jpg";
import {NavLink} from 'react-router-dom'

export const SingleImageTextComponent = ({ data, type }) => {
    const handleError = (e) => {
        e.target.src = noImage;
    };
    return (
        <>
            <div className="category-grid">
                <NavLink to={'/'+type+'/'+(data.slug ?? data._id)}>
                    <Figure className="text-center">
                        <Figure.Image
                            alt="180x180"
                            src={process.env.REACT_APP_API_URL + "/assests/" + data.image}
                            className="img img-fluid cat-list-image"
                            onError={handleError}
                        />
                        <Figure.Caption>{data?.title}</Figure.Caption>
                    </Figure>
                </NavLink>
            </div>
        </>
    );
};
