import { Card, CardContent, CardHeader, Avatar, IconButton, Menu, MenuItem, ListItemIcon, CardActions, Collapse, Typography, CardMedia } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import { styled } from '@mui/material/styles';

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

function Tool(props){
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isToolEditOpened, setToolEditOpened] = React.useState(false)
    const [isDeleteDialogOpened, setDeleteDialogOpened] = React.useState(false)
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const toolOption = () => {
        if (props.tool.author.id == props.user.id){
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
                        <MenuItem onClick={() => {handleClose(); setToolEditOpened(true)}}>
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
        <Card sx={{ maxWidth: 345 }} style={{"margin": "0.5rem"}}>
            <CardHeader avatar={
                <Avatar src={ props.tool ? props.tool.author.userImage : null } />}
                action={ props.tool ? toolOption() : null }
                title={ props.tool ? props.tool.title : 'loading...' }
                subheader={ props.tool ? "Author: "+props.tool.author.userName : 'loading...' }
                 ></CardHeader>
            { props.tool ? props.tool.image ? <CardMedia component="img" height="194" image={ props.tool ? props.tool.image : null } alt="Post Image" /> : null : null }
            <CardContent style={{"paddingBottom": "0"}}>
                <Typography varient='body2'>
                    { props.tool ? props.tool.description : 'loading...' }
                </Typography>
                <CardActions disableSpacing>
                    <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraphvariant="body2" color="text.secondary" style={{"whiteSpace": "pre-wrap"}}>
                        { props.tool ? props.tool.readme : 'loading...' }
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default Tool
