import { Row, Col} from "reactstrap";
import MapColumn from "./MapLayout";
import RoutesColumn from "./Routes";
import PlacesColumn from "./Places";



const Layout = () =>{
return(
    <Row >
        <Col xs={3} >
            <RoutesColumn />
        </Col>
        <Col xs={5} > 
            <MapColumn />
        </Col>
        <Col xs={4}>
            <PlacesColumn  />
        </Col>
    </Row>
)
}

export default Layout;