import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Switch, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CodeIcon from '@mui/icons-material/Code';
import { styled, useTheme, alpha } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HandymanIcon from '@mui/icons-material/Handyman';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LoginIcon from '@mui/icons-material/Login';
import Account from './Account';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import EditIcon from '@mui/icons-material/Edit';

// onClick={toggleDrawer(anchor, false)}
// onKeyDown={toggleDrawer(anchor, false)}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navigation = (props) => {
    const [ isAccountOpened, setAccountOpened] = React.useState(false)
    const [ open, setOpen] = React.useState(true);
    const [ isNavOpened, setNavOpened] = React.useState(false)
    const [ isLoading, setLoading] = React.useState()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const host = props.host
    const anchor = "left"
    const navigate = useNavigate()

    const handleCloseAccount = () => {
      setLoading(true)
      setAccountOpened(false)
    }

    const handleClick = () => {
      setOpen(!open);
    };
    
    React.useEffect(() => {
        setLoading(props.isLoading)
      }
    )

    const actionSearchButton = () => {
      if(window.location.pathname == '/posts/'){
        if(props.user){
            return(
          <Button color="success" variant="contained" style={{"marginInline": "1rem"}} 
          onClick={() => { props.setCreatePostOpenedNav(true) }}>
            Write Post <EditIcon />
          </Button>
          )
        } else {return null}
      } else {
        return null
      }
    }

    const actionSearch = () => {
      if(!isMobile){
        if(window.location.pathname == '/posts/' || window.location.pathname == '/lessons/' || window.location.pathname == '/tools'){
          return(
            <div style={{"display": "flex", "justifyContent": "center", "marginInline": "2rem"}}>
              <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase value={props.searchbarContent ? props.searchbarContent : ""} 
                    onChange={(event) => {props.setSearchbarContent(event.target.value)}} 
                    placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
              { actionSearchButton() }
            </div>
          )
        }
      } else {
        return null
      }
    }

    const navigations = isMobile ? [
      {name:'Login', active: props.user ? true : false, action: () => {}},
    ] : [
      {name:'Login', active: props.user ? true : false, action: () => {}},
      {name:'Lessons', action: () => {navigate('/lessons/')}},
      {name:'Tools', action: () => {navigate('/tools/')}},
    ]

    const menu = [
      {'name': 'Home', 'icon': <HomeIcon />, 'action': () => {navigate('/home/'); setNavOpened(!isNavOpened)}},
      {'name': 'Account', 'icon': <AccountCircleIcon />, 'action': () => {setAccountOpened(true); setNavOpened(!isNavOpened)}},
      {'name': 'About', 'icon': <InfoIcon />, 'action': () => {navigate('/about/'); setNavOpened(!isNavOpened)}},
      {'name': 'Tech News', 'icon': <NewspaperIcon />, 'action': () => {navigate('/technews/'); setNavOpened(!isNavOpened)}},
      {'name': 'posts', 'icon': <EmailIcon />, 'action': () => {navigate('/posts/'); setNavOpened(!isNavOpened)}},
      {'name': 'Developer', 'icon': <CodeIcon />, 'action': () => window.location.replace('https://davesmith.ml/')},
      {'name': props.user ? 'logout' : 'login', 'icon': props.user ? <LogoutIcon /> : <LoginIcon />, 'action': props.user ? () => {window.location.replace('/logout')} : () => {window.location.replace('/login')} },
    ]

    const list = () => (
        <Box
            sx={{'auto' : 250 }}
            role="presentation"
            onClick={() => {}}>
            <Divider></Divider>
            <ArrowBackIcon style={{"margin": "1rem"}} onClick={() => setNavOpened(!isNavOpened)}/>
            <MaterialUISwitch onChange={() => {}}/>
            <Divider></Divider>
            <List>
            {menu.map((nav, index) => (
                <ListItem button key={index} onClick={nav['action']}>
                    <ListItemIcon>
                        { nav['icon'] }
                    </ListItemIcon>
                    <ListItemText primary={ nav['name'] } />
                </ListItem>
            ))}
            <ListItemButton key='services' onClick={handleClick}>
              <ListItemIcon>
                <MedicalServicesIcon/>
              </ListItemIcon>
              <ListItemText primary="Services" />
              {!open ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton key='lessons' sx={{ pl: 4 }} onClick={() => navigate('/lessons/')}>
                  <ListItemIcon>
                  <CastForEducationIcon />
                  </ListItemIcon>
                  <ListItemText>Lessons</ListItemText>
                </ListItemButton>
                <ListItemButton key='tools' sx={{ pl: 4 }} onClick={() => navigate('/tools/')}>
                  <ListItemIcon>
                    <HandymanIcon />
                  </ListItemIcon>
                  <ListItemText>Tools</ListItemText>
                </ListItemButton>
                <ListItemButton key='ehi' sx={{ pl: 4 }} onClick={() => navigate('/ehi/')}>
                  <ListItemIcon>
                  <VpnKeyIcon />
                  </ListItemIcon>
                  <ListItemText>Ehi</ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
            </List>
            <Divider/>
        </Box>
    );

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
            <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu"
                onClick={() => setNavOpened(!isNavOpened) } sx={{ mr: 2 }} >
                <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' >Sl Cyber Warriors</Typography>
            { actionSearch(props) }
            <Box style={{"position": "fixed", "right": isMobile? "1rem" : "2rem", "display": "flex", "flexDirection": "row"}}>
              { navigations.map((nav) => (
                  <Button hidden={ nav.active } onClick={nav.action} color="inherit">{ nav.name }</Button>
              )) }
              <IconButton hidden={ props.user ? false : true } style={{"marginInline": isMobile ? null: "1rem"}} onClick={() => setAccountOpened(true)}>
                <Avatar src={ props.user ? props.user.userImage : null } sx={{width: 40, height: 40}}></Avatar>
              </IconButton>
            </Box>
            </Toolbar>
        </AppBar>
        <SwipeableDrawer
            anchor={anchor}
            open={isNavOpened}
            onClose={() => setNavOpened(false)}
            onOpen={() => setNavOpened(true)}>
            { list() }
        </SwipeableDrawer>
        </Box>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isAccountOpened} >
            <Account user={props.user} host={host} close={handleCloseAccount} />
        </Backdrop>
      </>
    );
}

export default Navigation;