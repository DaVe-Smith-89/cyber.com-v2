import React from "react";
import { Backdrop, ThemeProvider, Paper, Container, Button, TextField, Card, useMediaQuery } from "@mui/material";
import Navigation from "./navigation";
import Loading from "./loopcomponents/loading";
import Post from "./loopcomponents/post";
import Footer from "./footer";
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from "@mui/system";
import CreatePost from "./option/createpost";
import LoginRequired from "./loginrequire";
import axios from "axios";

class Posts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isCreatePostOpened: false,
            posts: []
        }
    }

    componentDidMount(){
        axios.get(this.props.host+"/api/web/posts/").then(data => {
            this.setState({posts: data.data})
        })
    }

    setCreatePostOpenedForNav = (value) => {
        this.setState({isCreatePostOpened: value})
    }

    setCreatePostOpened = (value) => {
        this.setState({isCreatePostOpened: value})
    }

    searchedData = () => {
        if(this.state.posts){
            for (var i = 0; i < this.state.posts.length; i++) {
                if(this.state.posts[i]['title'].toUpperCase().includes(this.props.searchbarContent.toUpperCase())){
                    return i
                }
            }
        }
    }

    refreshAll = () => {
        axios.get(this.props.host+"/api/web/posts/").then(data => {
            this.setState({posts: data.data})
        })
    }

    render(){
        const { IsMobile } = this.props
        if(this.props.isLoading){
            return (
              <ThemeProvider theme={this.props.theme}>
                <Paper elevation={0}>
                  <Navigation user={this.props.user} host={this.props.host} isLoading={this.props.isLoading} searchbarContent={this.props.searchbarContent}
                  setCreatePostOpenedNav={this.setCreatePostOpenedForNav} setSearchbarContent={this.props.setSearchbarContent} />
                  <Loading />
                </Paper>
              </ThemeProvider>
            )
        }
        
        if(!this.props.user){
            return(
                <ThemeProvider theme={this.props.theme}>
                    <Paper elevation={0}>
                        <Navigation user={this.props.user} host={this.props.host} isLoading={this.props.isLoading} searchbarContent={this.props.searchbarContent}
                        setCreatePostOpenedNav={this.setCreatePostOpenedForNav} setSearchbarContent={this.props.setSearchbarContent} />
                        <LoginRequired />
                    </Paper>
                </ThemeProvider>
            )
        }

        return(
            <ThemeProvider theme={this.props.theme}>
                <Paper elevation={0}>
                    <Navigation user={this.props.user} host={this.props.host} isLoading={this.props.isLoading} searchbarContent={this.props.searchbarContent}
                    setCreatePostOpenedNav={this.setCreatePostOpenedForNav} setSearchbarContent={this.props.setSearchbarContent} />
                    { IsMobile ? <Container style={{"paddingTop": "4rem", "display": "flex", "flexWrap": "wrap", "justifyContent": "center"}}>
                            <Card style={{"margin": "0.5rem", "display": "flex", "flexWrap": "wrap", "justifyContent": "center"}}>
                                <TextField variant="standard" style={{ "margin": "0.5rem" }} value={this.props.searchbarContent}
                                    onChange={(event) => {this.props.setSearchbarContent(event.target.value)}} placeholder="Search..." />
                                <Button color="success" variant="contained" onClick={() => {this.setState({isCreatePostOpened: true})}} style={{"margin": "1rem"}}>
                                    Write Post <EditIcon />
                                </Button>
                            </Card>
                        </Container> : null
                    }
                    <Container style={{"marginTop": IsMobile ? null : "4rem", "display": "flex", "flexWrap": "wrap", "justifyContent": "center"}}>
                        { !this.props.searchbarContent || this.props.searchbarContent==="" ? this.state.posts.map(post => {
                                return(<Post post={post} user={this.props.user} host={this.props.host} refreshAll={this.refreshAll} />)
                            }) : this.searchedData() || this.searchedData() == 0 ? <Post post={this.state.posts[this.searchedData()]} user={this.props.user} host={this.props.host} refreshAll={this.refreshAll} /> : "No result found..." 
                        }
                    </Container>
                    <Backdrop sx={{ color: '#fff', zIndex: +1 }} open={this.state.isCreatePostOpened} >
                        <CreatePost reCaptchaKey={this.props.reCaptchaKey} refreshAll={this.refreshAll}
                        setCreatePostOpened={(value) => {this.setCreatePostOpened(value)}} host={this.props.host} />
                    </Backdrop>
                    <Footer />
                </Paper>
            </ThemeProvider>
        )
    }
}

export default function (props){
    const theme = useTheme()
    return(<Posts {...props} IsMobile={useMediaQuery(theme.breakpoints.down("sm"))} />)
}
