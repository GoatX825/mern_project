import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
export const LoadImage = (props) => {
    const onInit = (e) => {
        console.log(e);
    };

    return (
        <>
            <LightGallery
                onInit={onInit}
                plugins={[lgThumbnail, lgZoom]}
            >
                 <a href={process.env.REACT_APP_API_URL+"/assests/"+props.src}>
                    View Image
                </a>

            </LightGallery>
        </>

    )
}