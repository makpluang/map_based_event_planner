import React from "react"
import { Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const PlaceCard = ({place, key, upcomingId}) => {

    return (
        <Card className="place-card">
            <CardBody>
                <CardImg
                    alt="Card image cap"
                    src={place.image}
                    top
                    width="100%"
                    className="place-card-img"
                />
                <CardTitle tag="h6" className="mt-3 mb-2 d-flex justify-content-between">
                    {place.title}
                    <div className="rating">
                    <span className="rating-icon">
                        <FontAwesomeIcon className="rating-icon-font" icon={faStar} />
                    </span>
                    {place.rating}
                    </div>
                </CardTitle>
                <CardText className="text-muted">
                    {place.about}
                </CardText>
            </CardBody>
        </Card>
    )
}

export default PlaceCard;