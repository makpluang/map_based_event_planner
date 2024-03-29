import { Card, CardBody } from "reactstrap"

import Map from "../component/Map"

import path from "../data"

const MapLayout = () =>{
    return(
        <Card className="map-column">
            <CardBody>
                <Map path={path} />
            </CardBody>
        </Card>
    )
}

export default MapLayout;