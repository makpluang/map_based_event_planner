import React from "react"
import { Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const PlaceCard = () => {
    return (
        <Card className="place-card">
            <CardBody>
                <CardImg
                    alt="Card image cap"
                    src="https://picsum.photos/318/180"
                    top
                    width="100%"
                    className="place-card-img"
                />
                <CardTitle tag="h6" className="mt-3 mb-2 d-flex justify-content-between">
                    Card title
                    <div className="rating">
                    <span className="rating-icon">
                        <FontAwesomeIcon className="rating-icon-font" icon={faStar} />
                    </span>
                        5.0
                    </div>
                </CardTitle>
                <CardText className="text-muted">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </CardText>
            </CardBody>
        </Card>
    )
}

export default PlaceCard;