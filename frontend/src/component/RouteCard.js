import React from "react"
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons'

const RouteCard = ({route, upcomingId, id}) => {
    console.log(id, upcomingId)

    const trackBallColor = route.traversed ? "#7CC1A7": (id === upcomingId) ?  "#C64C52" : "#98CFF4"
    return (
        <Card className={`route-card ${id === upcomingId && `active`}`}>
            <CardBody>
                <span className="route-track-ball" style = {{ backgroundColor: trackBallColor}}>
                    
                </span>
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