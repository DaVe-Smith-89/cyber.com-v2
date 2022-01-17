import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import { createTheme } from "@mui/material";
import Posts from "./components/posts";
import TechNewsView from "./components/technews";
import LessonsView from "./components/lessons";
import ToolView from "./components/tools";
import EhiView from "./components/ehi";

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      theme: createTheme({palette: {mode: "dark"}}),
      isLoading: true,
      host: '',
      user: null,
      lessons: null,
      news: null,
      tools: null,
      searchbarContent: null,
      reCaptchaKey: "6LekGdsdAAAAAPuLoISfIuCrqR0pwEqItMd5Bjpz"
    }
  }

  componentDidMount(){
    axios.get(this.state.host+'/api/web/user/').then(userdata => {
      this.setState({user: userdata.data})
      axios.get(this.state.host+'/api/web/lessons/').then(lessondata =>{
        this.setState({lessons: lessondata.data})
        axios.get(this.state.host+'/api/web/technews/').then(newsData => {
        this.setState({news: newsData.data.articles})
          this.setState({isLoading: false})
        })
      })
    }).catch(err => {
      axios.get(this.state.host+'/api/web/lessons/').then(lessondata =>{
        this.setState({lessons: lessondata.data})
        axios.get(this.state.host+'/api/web/technews/').then(newsData => {
          this.setState({news: newsData.data.articles})
          this.setState({isLoading: false})
        })
      })
    })
  }

  refreshAll = () => {
    this.setState({isLoading: true})
    axios.get(this.state.host+'/api/web/user/').then(userdata => {
      this.setState({user: userdata.data})
      axios.get(this.state.host+'/api/web/lessons/').then(lessondata =>{
        this.setState({lessons: lessondata.data})
        axios.get(this.state.host+'/api/web/technews/').then(newsData => {
          this.setState({news: newsData.data.articles})
          this.setState({isLoading: false})
        })
      })
    }).catch(err => {
      axios.get(this.state.host+'/api/web/lessons/').then(lessondata =>{
        this.setState({lessons: lessondata.data})
        axios.get(this.state.host+'/api/web/technews/').then(newsData => {
          this.setState({news: newsData.data.articles})
          this.setState({isLoading: false})
        })
      })
    })
  }

  setSearchbarContent = (value) => {
    this.setState({searchbarContent: value})
  }

  setLoadingForComponents = (value) => {
    this.setState({isLoading: value})
  }

  render(){
    return (
      <Router>
        <Routes>
          <Route path="/" element={
              <Home isLoading={this.state.isLoading} user={this.state.user} isAbout={false} news={this.state.news}
              host={this.state.host} lessons={this.state.lessons} theme={this.state.theme} />
            }/>
          <Route path="/home/" element={
              <Home isLoading={this.state.isLoading} user={this.state.user} isAbout={false} news={this.state.news}
              host={this.state.host} lessons={this.state.lessons} theme={this.state.theme} />
            } />
          <Route path="/about/" element={
              <Home isLoading={this.state.isLoading} user={this.state.user} isAbout={true} news={this.state.news}
              host={this.state.host} lessons={this.state.lessons} theme={this.state.theme} />
            } />
          <Route path='/posts/' element={
            <Posts host={this.state.host} isLoading={this.state.isLoading} setLoading={this.setLoadingForComponents}
            reCaptchaKey={this.state.reCaptchaKey} theme={this.state.theme} user={this.state.user} refreshAll={this.refreshAll} 
            setSearchbarContent={this.setSearchbarContent} searchbarContent={this.state.searchbarContent} setSearchbarContent={this.setSearchbarContent}/>
            } />
          <Route path='/technews/' element={
              <TechNewsView host={this.state.host} isLoading={this.state.isLoading} theme={this.state.theme} 
              news={this.state.news} user={this.state.user} />
            } />
          <Route path='/lessons/' element={
              <LessonsView host={this.state.host} isLoading={this.state.isLoading} theme={this.state.theme}
              user={this.state.user} lessons={this.state.lessons} searchbarContent={this.state.searchbarContent} setSearchbarContent={this.setSearchbarContent}/>
            } />
          <Route path='/tools/' element={
              <ToolView host={this.state.host} isLoading={this.state.isLoading} theme={this.state.theme}
              user={this.state.user} tools={this.state.tools} setLoading={this.setLoadingForComponents} />
            } />
          <Route path='/ehi/' element={
              <EhiView host={this.state.host} isLoading={this.state.isLoading} theme={this.state.theme}
              user={this.state.user} setLoading={this.setLoadingForComponents} />
            } />
        </Routes>
      </Router>
    )
  }
}

export default App;
