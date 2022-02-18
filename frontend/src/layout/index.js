import { Row, Col} from "reactstrap";

import MapColumn from "./MapLayout";
import RoutesColumn from "./Routes";
import PlacesColumn from "./Places";



const Layout = () =>{
return(
    <Row >
        <Col>
            <RoutesColumn />
        </Col>
        <Col> 
            <MapColumn />
        </Col>
        <Col>
            <PlacesColumn />
        </Col>
    </Row>
)
}

export default Layout;