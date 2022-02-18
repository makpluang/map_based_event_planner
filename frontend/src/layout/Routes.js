import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

const Routes = () => {
    return (
        <Card >
            <CardBody>
                <CardTitle tag="h5">
                    Routes
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    Card subtitle
                </CardSubtitle>
            </CardBody>
        </Card>
    )
}

export default Routes;