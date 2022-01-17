import React from "react"
import Loading from "./loopcomponents/loading"
import { ThemeProvider } from "@mui/system"
import Navigation from "./navigation"
import { Paper, Container } from "@mui/material"
import axios from "axios"
import Ehi from "./loopcomponents/ehi"

class EhiView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ehis: null
        }
    }

    componentDidMount(){
        this.props.setLoading(true)
        axios.get(this.props.host+"/api/web/ehi/").then(data => {
            this.setState({ehis: data.data})
            this.props.setLoading(false)
        }).catch(err => {
            window.location.replace('/ehi/')
        })
    }

    render(){
        if(this.props.isLoading){
            return(
                <ThemeProvider theme={this.props.theme}>
                    <Paper elevation={0}>
                    <Navigation user={this.props.user} host={this.props.host} isLoading={this.props.isLoading} />
                    <Loading />
                    </Paper>
                </ThemeProvider>
            )
        }
        
        return(
            <ThemeProvider theme={this.props.theme}>
                <Paper elevation={0} style={{height: "100vh"}}>
                    <Navigation user={this.props.user} host={this.props.host} isLoading={this.props.isLoading} />
                    <Container style={{display: "flex", flexDirection: "row", flexWrap: "wrap", paddingTop: "5rem"}}>
                        { this.state.ehis ? this.state.ehis.map(ehi => {
                            return(<Ehi ehi={ehi} host={this.props.host} />)
                        }) : null }
                    </Container>
                </Paper>
            </ThemeProvider>
        )
    }
}

export default EhiView;
