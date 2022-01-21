import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { CardMedia } from "@mui/material";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

function Lesson(props){
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    return(
        <Card style={{"margin": "0.5rem"}} sx={{ maxWidth: 365 }}>
            <CardMedia component="iframe" height="140" image={ props.lesson ? props.lesson.url : props.host+"/static/img/logo.jpg"} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    { props.lesson ? props.lesson.title : "loading..." }
                </Typography>
                <Typography paragraph style={{whiteSpace: "pre-wrap"}}>
                    { props.lesson ? props.lesson.content : 'loading...'}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Lesson
