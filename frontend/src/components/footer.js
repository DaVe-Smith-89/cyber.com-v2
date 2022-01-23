import { Backdrop, Button, Container, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Card } from "@mui/material";

function Footer(props){
    const [isGithubOpened, setGithubOpened] = React.useState(false)
    const anchorStyle = {"textDecoration": "none", "color": "inherit"}

    return(
        <>
        <footer>
            <div style={{"padding": "1rem"}}>
                <Divider style={{"marginBottom": "2rem"}} />
                <Container style={{"display": "flex"}}>
                    <div style={{"width": "50%"}}>
                        <Link to="/home" style={anchorStyle} >Home</Link><br/>
                        <Link to="/about" style={anchorStyle} >About</Link><br/>
                        <Link to="/lessons" style={anchorStyle} >Lessons</Link><br/>
                        <Link to="/technews" style={anchorStyle} >Tech News</Link><br/>
                        <Link to="/posts" style={anchorStyle} >Posts</Link><br/>
                        <a target="_blank" style={anchorStyle} href="https://t.me/Dave_Smith_89">Contact Developer</a>
                    </div>
                    <div style={{"width": "50%"}}>
                        <a target="_blank" href="https://www.facebook.com/groups/424580708746052/" style={anchorStyle}><FacebookOutlinedIcon /> FaceBook Group</a><br />
                        <a target="_blank" href="https://www.youtube.com/channel/UCOC4YlK-7mb5jIbCRcuijvQ" style={anchorStyle}><YouTubeIcon /> Youtube</a><br />
                        <a target="_blank" href="https://www.facebook.com/cyber.warrior.page/" style={anchorStyle}><FacebookOutlinedIcon /> FaceBook Page</a><br />
                        <a target="_blank" href="https://t.me/by_sstp" style={anchorStyle}><TelegramIcon /> Telegram</a><br />
                        <p>
                        <IconButton onClick={() => setGithubOpened(true)} style={{"margin": "0", "padding": "0"}}><GitHubIcon /></IconButton>
                        <Button onClick={() => setGithubOpened(true)} color="inherit">Github</Button>
                        </p>
                    </div>
                </Container>
            </div>
            <Divider style={{"margin": "0 1rem 1rem 1rem"}} />
            <Container style={{"textAlign": "center"}}>
                <Typography pb={2} variant="body1">All Rights Reserved 2020-2021 Sl Cyber Warriors</Typography>
            </Container>
        </footer>
        <Backdrop open={isGithubOpened}>
            <Card>
                <List>
                    <ListItemButton key="davesmith" onClick={() => window.location.replace('https://github.com/DaVe-Smith-89')}>
                        <ListItemIcon>
                            <GitHubIcon />
                        </ListItemIcon>
                        <ListItemText primary='Dave Smith' />
                    </ListItemButton>
                    <ListItemButton key="johnkener" onClick={() => window.location.replace('https://github.com/John-kener')}>
                        <ListItemIcon>
                            <GitHubIcon />
                        </ListItemIcon>
                        <ListItemText primary='John Kener' />
                    </ListItemButton>
                    <ListItemButton key="visalperera" onClick={() => window.location.replace('https://github.com/VPseeker')}>
                        <ListItemIcon>
                            <GitHubIcon />
                        </ListItemIcon>
                        <ListItemText primary='Visal Perera' />
                    </ListItemButton>
                </List>
                <Button style={{"marginLeft": "7rem"}} onClick={() => setGithubOpened(false)}>Close</Button>
            </Card>
        </Backdrop>
        </>
    )
}

export default Footer
