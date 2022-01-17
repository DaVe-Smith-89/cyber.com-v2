import React from "react";
import { ThemeProvider, Paper, Container, useTheme, useMediaQuery } from "@mui/material";
import Loading from "./loopcomponents/loading";
import Navigation from "./navigation";
import Footer from "./footer";
import News from "./loopcomponents/news";

function TechNewsView(props){
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [news, setNews] = React.useState([])

    React.useEffect(() => {
        setNews(props.news)
    })

    if(props.isLoading){
        return (
          <ThemeProvider theme={props.theme}>
            <Paper elevation={0}>
              <Navigation user={props.user} host={props.host} isLoading={props.isLoading} />
              <Loading />
            </Paper>
          </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={props.theme}>
            <Paper elevation={0}>
                <Navigation user={props.user} host={props.host} isLoading={props.isLoading} />
                <Container style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "center", "paddingTop": "4rem"}}>
                { news ? news.map(n => {
                    return(<News host={props.host} News={n} />)
                }) : null }
                </Container>
                <Footer />
            </Paper>
        </ThemeProvider>
    )
}

export default TechNewsView
