import { Container, Typography } from "@mui/material";
import React from "react";

function Loading(){
    return(
        <Container style={{"textAlign": "center", "height": "100vh"}}>
            {/* <div style={{"paddingTop": "5rem"}}>
                <Typography variant="h5">
                    This should load within 15 seconds
                    otherwise refresh browser!
                </Typography>
                <Typography style={{"marginTop": "2rem"}} variant="body1">- Dave Smith</Typography>
            </div> */}
        </Container>
    )
}

export default Loading
