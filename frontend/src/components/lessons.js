import React from "react";
import { ThemeProvider, Paper, Container, TextField, Card, useTheme, useMediaQuery } from "@mui/material";
import Loading from "./loopcomponents/loading";
import Navigation from "./navigation";
import Lesson from "./loopcomponents/lesson";
import Footer from "./footer";

function LessonsView(props){
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    if(props.isLoading){
        return (
          <ThemeProvider theme={props.theme}>
            <Paper elevation={0}>
              <Navigation user={props.user} host={props.host} isLoading={props.isLoading}
              setSearchbarContent={props.setSearchbarContent} searchbarContent={props.searchbarContent} />
              <Loading />
            </Paper>
          </ThemeProvider>
        )
    }

    const searchedData = () => {
        if(props.lessons){
            for (var i = 0; i < props.lessons.length; i++) {
                if(props.lessons[i]['title'].toUpperCase().includes(props.searchbarContent.toUpperCase())){
                    return i
                }
            }
        }
    }

    if(props.searchbarContent){
        return (
            <ThemeProvider theme={props.theme}>
                <Paper elevation={0}>
                    <Navigation user={props.user} host={props.host} isLoading={props.isLoading}
                    setSearchbarContent={props.setSearchbarContent} searchbarContent={props.searchbarContent} />
                    { isMobile ? <Container style={{"paddingTop": "4rem", "display": "flex", "flexWrap": "wrap", "justifyContent": "center"}}>
                            <Card style={{"margin": "0.5rem", "display": "flex", "flexWrap": "wrap", "justifyContent": "center", "padding": "0.5rem"}}>
                                <TextField variant="standard" style={{ "margin": "0.5rem" }} value={props.searchbarContent}
                                    onChange={(event) => {props.setSearchbarContent(event.target.value)}} placeholder="Search..." />
                            </Card>
                        </Container> : null
                    }
                    <Container style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "center", "paddingTop": isMobile ? null : "4rem"}}>
                        { searchedData() || searchedData() == 0 ? <Lesson host={props.host} lesson={props.lessons[searchedData()]} /> : 'No result found...'}
                    </Container>
                    <Footer />
                </Paper>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={props.theme}>
            <Paper elevation={0}>
                <Navigation user={props.user} host={props.host} isLoading={props.isLoading}
                setSearchbarContent={props.setSearchbarContent} searchbarContent={props.searchbarContent} />
                { isMobile ? <Container style={{"paddingTop": "4rem", "display": "flex", "flexWrap": "wrap", "justifyContent": "center"}}>
                        <Card style={{"margin": "0.5rem", "display": "flex", "flexWrap": "wrap", "justifyContent": "center", "padding": "0.5rem"}}>
                            <TextField variant="standard" style={{ "margin": "0.5rem" }} value={props.searchbarContent}
                                onChange={(event) => {props.setSearchbarContent(event.target.value)}} placeholder="Search..." />
                        </Card>
                    </Container> : null
                }
                <Container style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "center", "paddingTop": isMobile ? null : "4rem"}}>
                    { props.lessons ? props.lessons.map(lesson => {
                        return(<Lesson host={props.host} lesson={lesson} />)
                    }) : null }
                </Container>
                <Footer />
            </Paper>
        </ThemeProvider>
    )
}

export default LessonsView
