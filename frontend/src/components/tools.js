import React from "react";
import { ThemeProvider, Paper, Container } from "@mui/material";
import Navigation from "./navigation";
import Loading from "./loopcomponents/loading";
import Footer from "./footer";
import Tool from "./loopcomponents/tool";
import LoginRequired from "./loginrequire"
import axios from "axios";

class ToolView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tools: []
        }
    }

    componentDidMount(){
        axios.get(this.props.host+"/api/web/tools/").then(data => {
            this.setState({tools: data.data})
        })
    }

    refreshAll = () => {
        axios.get(this.props.host+"/api/web/posts/").then(data => {
            this.setState({posts: data.data})
        })
    }
    
    render(){
        if(this.props.isLoading){
            return (
            <ThemeProvider theme={this.props.theme}>
                <Paper elevation={0}>
                <Navigation user={this.props.user} host={this.props.host} isLoading={this.props.isLoading} />
                <Loading />
                </Paper>
            </ThemeProvider>
            )
        }

        if(!this.props.user){
            return(
                <ThemeProvider theme={this.props.theme}>
                    <Paper elevation={0}>
                        <Navigation user={this.props.user} host={this.props.host} isLoading={this.props.isLoading} searchbarContent={this.props.searchbarContent} />
                        <LoginRequired />
                    </Paper>
                </ThemeProvider>
            )
        }

        return(
            <ThemeProvider theme={this.props.theme}>
                <Paper elevation={0}>
                    <Navigation user={this.props.user} host={this.props.host} isLoading={this.props.isLoading} />
                    <Container style={{"paddingTop": "4rem", "display": "flex", "flexWrap": "wrap", "justifyContent": "center"}}>
                        { this.state.tools ? this.state.tools.map(tool => {
                            return(<Tool tool={tool} user={this.props.user} />)
                        }) : null }
                    </Container>
                    <Footer />
                </Paper>
            </ThemeProvider>
        )
    }
}

export default ToolView
