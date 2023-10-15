import {  Alert, Col, Container, Row } from "react-bootstrap";
import HeaderComponent from "../../components/header/header.component";

const ErrorPage = () => {
    return(
        <>
            <HeaderComponent/>

            <Container>
                <Row>
                    <Col>
                        <Alert variant="danger">
                            404! Page Not Found
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ErrorPage;