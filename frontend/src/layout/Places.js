import React from "react";
import { Card, CardBody, CardTitle} from "reactstrap"

import PlaceCard from "../component/PlaceCard";

const Places = () => {
    return (
        <Card title="Route">
            <CardBody>
                <CardTitle tag="h5">
                    Upcoming Places
                </CardTitle>
              < PlaceCard/>
            </CardBody>
        </Card>
    )
}

export default Places;