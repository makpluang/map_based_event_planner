import React from "react"
import { Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons'

const RouteCard = ({route}) => {
    return (
        <Card className={`route-card ${route.title === "Gurgaon" && `active`}`}>
            <CardBody>
                <CardTitle tag="h6" className="mt-3 mb-2">
                    <FontAwesomeIcon icon={faDiamondTurnRight} className="route-icon" />
                    {route.title}
                </CardTitle>
                <CardText className="text-muted">
                    <h6>Distance: </h6>
                    <h6>Estimated Arrival:</h6>
        
                </CardText>
            </CardBody>
        </Card>
    )
}

export default RouteCard;