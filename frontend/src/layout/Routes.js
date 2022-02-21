import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap"
import { useSelector } from "react-redux";
import RouteCard from "../component/RouteCard"

const Routes = () => {
    const {start, destination, route} = useSelector(state => state)
    return (
        <Card className="route-column">
            <CardBody>
                <CardTitle tag="h5">
                    Routes
                </CardTitle>
                {route && route.map((dest) => 
                    <RouteCard route={dest} key={dest._id} />  
                )} 
            </CardBody>
        </Card>
    )
}

export default Routes;