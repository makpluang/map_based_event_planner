import React from "react";
import { Card, CardBody, CardTitle} from "reactstrap"

import placesData from "../data"

import PlaceCard from "../component/PlaceCard";

const Places = () => {
    return (
        <Card className="place-column">
            <CardBody>
                <CardTitle tag="h5">
                    Upcoming Places
                </CardTitle>
               { placesData.route.map((place) => 
                    < PlaceCard place={place} key={place.id} />)
                }
              
            </CardBody>
        </Card>
    )
}

export default Places;