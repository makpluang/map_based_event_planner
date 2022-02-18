import { Card } from "reactstrap"

import Map from "../component/Map"

import path from "../data"

const MapLayout = () =>{
    return(
        <Card>
            <Map path={path} />
        </Card>
    )
}

export default MapLayout;