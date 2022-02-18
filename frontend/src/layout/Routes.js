import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

import RouteCard from "../component/RouteCard"
import routeData from "../data"

const Routes = () => {
    return (
        <Card className="route-column">
            <CardBody>
                <CardTitle tag="h5">
                    Routes
                </CardTitle>
                {routeData.route.map((dest) => 
                    <RouteCard route={dest} key={dest.id} />  
                )} 
            </CardBody>
        </Card>
    )
}

export default Routes;