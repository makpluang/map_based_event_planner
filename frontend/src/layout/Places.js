import React from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle} from "reactstrap"

import PlaceCard from "../component/PlaceCard";

const Places = () => {
    const {start, destination, route} = useSelector(state => state)

    return (
        <Card className="place-column">
            <CardBody>
                <CardTitle tag="h5">
                    Upcoming Places
                </CardTitle>
               { 
                    route && route.map((place) => 
                    < PlaceCard place={place} key={place._id} />)
                }
              
            </CardBody>
        </Card>
    )
}

export default Places;