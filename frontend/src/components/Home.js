import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Paper, Typography } from '@mui/material';
import Navigation from './navigation';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { Button } from '@mui/material';
import Lesson from './loopcomponents/lesson';
import News from './loopcomponents/news';
import Footer from './footer';
import Loading from './loopcomponents/loading';

export default function Home(props) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const aboutRef = React.useRef(null)

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

  if(props.isAbout){
    window.scroll(0, isMobile ? 2200 : 1000)
  }

  return (
    <ThemeProvider theme={props.theme}>
      <Paper elevation={0}>
        <Navigation user={props.user} host={props.host} isLoading={props.isLoading} />
        <img src={props.host+'/static/img/banner.jpg'} style={
          {"height": isMobile ? "auto" : '10rem', "width": "100%", "marginTop": "3rem", "objectFit": "cover"}}/>
        <Container style={{"marginTop": "3rem"}}>
          <div style={{"display": "flex", "flexDirection": isMobile ? "column" : "row"}}>
            <div style={{"width": isMobile ? null : "50%", "marginRight": isMobile ? null : "10%"}}>
              <h1>Sl Cyber Warriors</h1>
              <p>
                The best Sri lankan Community of programmers, 
                web developers, app developers, & free internet providers and 
                the team which have largest database of team members & followers.
              </p>
            </div>
            <div>
              <a target="_blank" href='https://www.youtube.com/channel/UCOC4YlK-7mb5jIbCRcuijvQ' style={{"textDecoration": "none", "marginRight": "1rem"}}><Button variant='contained'>Subscribe us</Button></a>
              <a target="_blank" href='https://t.me/by_sstp' style={{"textDecoration": "none"}}><Button variant='outlined'>Join us</Button></a>
            </div>
          </div>
        </Container>
        <Container>
          <Typography variant='h5' mt={4} color='inherit' align='center'>Some Of The Lessons We Did.</Typography>
        </Container>
        <Container style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "center"}}>
          <Lesson host={props.host} lesson={ props.lessons[Math.floor(Math.random() * props.lessons.length)] } />
          <Lesson host={props.host} lesson={ props.lessons[Math.floor(Math.random() * props.lessons.length)] } />
          <Lesson host={props.host} lesson={ props.lessons[Math.floor(Math.random() * props.lessons.length)] } />
        </Container>
        <Container ref={aboutRef} style={{"display": "flex", "flexDirection": isMobile ? "column" : "row"}}>
          <img src={props.host+'/static/img/logo.jpg'} style={{"width": isMobile ? null : "30%", "margin": isMobile ? '0.5rem' : "5%"}} />
          <div style={{"width": isMobile ? null : "40%", "margin": isMobile ? '0.5rem' : "5%"}}>
            <Typography variant='h5'>A Description About Us</Typography>
            <Typography paragraph={true} style={{"marginTop": "2rem"}}>
              We Are Going On A Long Journey Since 2020/10/02 Untill Today.
              We Found Success Having Passed Many Troubles & Barriers And 
              The Courage Brought Us To The Targets .So Today We Have The Best 
              Srilankan Team Of Best Gang Of People, Who Found The Real Taste Of The Technology. 
              This Is The Best Place For Upcoming Technology Lovers For Past ,Today And Also For Future. Come On... 
              Join With Us & Let's Make A Real Change In The System...
            </Typography>
            <a href='' style={{"textDecoration": "none"}}><Button variant='contained'>Download App</Button></a>
          </div>
        </Container>
        <Container>
          <Typography variant='h5' mt={4} color='inherit' align='center'>Some Articles From Article Section.</Typography>
        </Container>
        <Container style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "center"}}>
            <News host={props.host} News={props.news[ Math.floor(Math.random() * props.news.length) ]} />
            <News host={props.host} News={props.news[ Math.floor(Math.random() * props.news.length) ]} />
            <News host={props.host} News={props.news[ Math.floor(Math.random() * props.news.length) ]} />
        </Container>
        <Footer />
      </Paper>
    </ThemeProvider>
  );
}
