import { Card, CardMedia, CardContent, Typography, CardActionArea, IconButton } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import ReadMoreIcon from '@mui/icons-material/ReadMore';

function News(props){
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    return(
        <Card style={{"margin": "0.5rem", width: isMobile ? "100%" : null}} sx={{ maxWidth: 365 }}>
            <CardMedia component="img" height="140" image={ props.News ? props.News.urlToImage : props.host+'/static/img/logo.jpg' } />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    { props.News ? props.News.title : 'loading...' }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    { props.News ? props.News.description : 'loading...' }
                </Typography>
                <CardActionArea style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "flex-end"}}>
                    <a href={ props.News ? props.News.url : "#" }><IconButton><ReadMoreIcon /></IconButton></a>
                </CardActionArea>
            </CardContent>
        </Card>
    )
}

export default News
