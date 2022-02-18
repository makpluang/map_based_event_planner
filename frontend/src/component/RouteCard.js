import React from "react"
import { Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons'

const RouteCard = ({route}) => {
    return (
        <Card className="route-card">
            <CardBody>
                <CardTitle tag="h6" className="mt-3 mb-2">
                    <FontAwesomeIcon icon={faDiamondTurnRight} />
                    {route.title}
                </CardTitle>
                <CardText className="text-muted">
                    {route.about}
                </CardText>
            </CardBody>
        </Card>
    )
}

export default RouteCard;