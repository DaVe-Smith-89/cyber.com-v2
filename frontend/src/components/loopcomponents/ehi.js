import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

function Ehi(props){
    return(
        <Card sx={{ maxWidth: 365 }} style={{width: "100%", "margin": "0.5rem", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            <CardContent>
                <Typography variant="h6" color="inherit">{ props.ehi ? props.ehi.name : "Loading..." }</Typography>
            </CardContent>
            <CardActions style={{marginRight: "2%", paddingRight: 0, marginLeft: "auto"}}>
                <a href={props.ehi ? props.host+"/ehi/exchange/"+props.ehi.id+"/" : props.host+"/"} style={{textDecoration: "none"}}>
                    <Button variant="contained">Download</Button>
                </a>
            </CardActions>
        </Card>
    )
}

export default Ehi;