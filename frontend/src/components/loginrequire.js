import React from "react";
import { Button, Container } from  "@mui/material"

function LoginRequired(props){
    return (
        <React.Fragment>
            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", height: "100vh"}}>
                <Container>
                    <center>
                        <h3 style={{textTransform: "capitalize"}}>you must be logged in to access this page!</h3>
                        <Button onClick={() => {window.location.replace('/login')}} style={{margin: "0.5rem"}} variant="contained">log in</Button>
                    </center>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default LoginRequired;

