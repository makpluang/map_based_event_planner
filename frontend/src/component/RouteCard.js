import React, {useEffect} from "react"
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons'

const RouteCard = ({route, upcomingId, id, data}) => {
    useEffect (()=>{
        if(id === upcomingId){
            const card = document.getElementById(`route-${id}`)
            card.scrollIntoView()
        }
    },[id, upcomingId])

    const trackBallColor = route.traversed ? "#4ABDAC": (id === upcomingId) ?  "#FC4A1A" : "#98CFF4"
    return (
        <Card className={`route-card ${id === upcomingId && `active`}`} id ={`route-${id}`}>
            <CardBody>
                <span className="route-track-ball" style = {{ backgroundColor: trackBallColor}}>
                    
                </span>
                <CardTitle tag="h6" className="mt-3 mb-2">
                    <FontAwesomeIcon icon={faDiamondTurnRight} className="route-icon" />
                    {route.title}
                </CardTitle>
                <CardText className="text-muted">
                    <h6>Distance: {data ? `${Math.round(data.dist)} kms` : "--"}  </h6>
                    <h6>Estimated Arrival: {data ? data.duration: "--"}</h6>
        
                </CardText>
            </CardBody>
        </Card>
    )
}

export default RouteCard;