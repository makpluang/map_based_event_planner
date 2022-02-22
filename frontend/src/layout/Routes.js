import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap"
import { useSelector } from "react-redux";
import RouteCard from "../component/RouteCard"

const Routes = () => {
    const {route, upcomingId} = useSelector(state => state)
    return (
        <Card className="route-column">
            <CardBody>
                <CardTitle tag="h5">
                    Routes
                </CardTitle>

                <div className="route-info d-flex justify-content-start mt-2 ">
                    <div className="route-track">

                    </div>
                    <div className="route-info-col flex-grow-1">
                    {route && route.map((dest) => 
                    <RouteCard route={dest} key={dest._id} id ={dest._id} upcomingId={upcomingId} />  
                    )} 
                    </div>
                </div>
                
            </CardBody>
        </Card>
    )
}

export default Routes;