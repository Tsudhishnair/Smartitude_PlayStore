import React, { Component } from "react";
import Login from '../../views/Login/Login';
import logo from "../../assets/img/faces"
class Login extends Component {
    render() {
        return (
            <div>
                <GridConatiner>
                    <GridItem md={6}
                    justify="center"
                    alignItems="center"
                    >
                        {new_logo}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Login />
                    </GridItem>
                </GridConatiner>
            </div>

        )
    }
}

export default Login;