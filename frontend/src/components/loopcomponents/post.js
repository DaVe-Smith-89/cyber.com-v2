import React from "react";
import { Menu, MenuItem, Avatar, Card, CardActions, DialogActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Collapse, ListItemIcon, Backdrop, Dialog, DialogTitle, Button, DialogContentText, DialogContent, useMediaQuery, useTheme } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditPost from "../option/editpost";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function Post(props){
    const [expanded, setExpanded] = React.useState(false);
    const [post, setPost]  = React.useState()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isPostEditOpened, setPstEditOpened] = React.useState(false)
    const [isDeleteDialogOpened, setDeleteDialogOpened] = React.useState(false)
    const open = Boolean(anchorEl);
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        setPost(props.post)
    })

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const postOption = () => {
        if (post.author.id == props.user.id){
            return(
                <div>
                    <IconButton aria-controls="basic-menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}><MoreVertIcon /></IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: "left",
                          }}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}>
                        <MenuItem onClick={() => {handleClose(); setPstEditOpened(true)}}>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            Edit
                        </MenuItem>
                        <MenuItem onClick={() => {handleClose(); setDeleteDialogOpened(true)}}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            Delete
                        </MenuItem>
                    </Menu>
                </div>
            )
        } else {
            return null
        }
    }

    return(
        <>
        <Card sx={{ maxWidth: 365 }} style={{"margin": "0.5rem", width: isMobile ? "100%" : null}}>
            <CardHeader avatar={
                <Avatar src={ post ? post.author.userImage : null } >

                </Avatar>}
                action={ post ? postOption() : null }
                title={ post ? post.title : 'loading...' }
                subheader={ post ? post.datePosted : 'loading...' } />
            { post ? post.image ? <CardMedia component="img" height="194" image={ post ? post.image : null } alt="Post Image" /> : null : null }
            <CardContent style={{"paddingBottom": "0"}}>
                <Typography varient='body2'>
                    { post ? post.description : 'loading...' }
                </Typography>
                <CardActions disableSpacing>
                    <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        { post ? post.content : 'loading...' }
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isPostEditOpened}>
            <EditPost closeBackDrop={setPstEditOpened} post={post ? post : null } host={props.host} refreshAll={props.refreshAll} />
        </Backdrop>
        <Dialog open={isDeleteDialogOpened} onClose={() => setDeleteDialogOpened(false)}>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete the post, { post ? post.title : null} </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteDialogOpened(false)}>Close</Button>
                <Button onClick={() => {
                    function getCookie(name) {
                        let cookieValue = null;
                        if (document.cookie && document.cookie !== '') {
                            const cookies = document.cookie.split(';');
                            for (let i = 0; i < cookies.length; i++) {
                                const cookie = cookies[i].trim();
                                // Does this cookie string begin with the name we want?
                                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                    break;
                                }
                            }
                        }
                        return cookieValue;
                    }
                    const csrftoken = getCookie('csrftoken');
                    axios({
                        method: "DELETE",
                        url: String(props.host+'/api/web/posts/'+String(post.id)),
                        headers: {'X-CSRFToken': csrftoken},
                        data: {"csrfmiddlewaretoken": csrftoken},
                    }).then(data => {
                        props.refreshAll()
                    }).catch(err => {
                        props.refreshAll()
                    })
                }}>Delete</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default Post
