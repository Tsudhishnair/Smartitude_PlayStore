import React, { Component } from "react";
import Login from '../../views/Login/Login';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

class Log extends Component {
    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem md={6}
                        justify="center"
                        alignItems="center"
                    >
                       {/* <img src={new_logo} alt="logo"/>; */}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Login />
                    </GridItem>
                </GridContainer>
            </div>

        )
    }
}

export default Log;