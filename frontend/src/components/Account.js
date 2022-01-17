import React from "react";
import { Avatar, Button, Collapse, IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { TextField } from "@mui/material";
import axios from "axios";
import { Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function Account(props){
    const [isNameChanged, setNameChanged] = React.useState(false)
    const [isImageChanged, setImageChanged] = React.useState(false)
    const [name, setName] = React.useState()
    const [image, setImage] = React.useState()
    const [user, setUser] = React.useState()
    const [isErrorAllertOpened, setErrorAllertOpened] = React.useState(false)
    const [isSuccessAllertOpened, setSuccessAllertOpened] = React.useState(false)

    React.useEffect(() => {
        setUser(props.user)
    })

    const errorAllert = () => {
        return(
            <Collapse in={isErrorAllertOpened}>
                <Alert severity="error" action={
                    <IconButton onClick={() => setErrorAllertOpened(false)}>
                        <CloseIcon />
                    </IconButton>
                } >User Name field must <br/> 
                    be less than 30 characters <br/>
                    and User Image field must be <br/>
                    less than 200 characters!
                </Alert>
            </Collapse>
        )
    }

    const successAllert = () => {
        return(
            <Collapse in={isSuccessAllertOpened}>
                <Alert severity="success" action={
                    <IconButton onClick={() => setSuccessAllertOpened(false)}>
                        <CloseIcon />
                    </IconButton>
                } >profile updated successfully!
                </Alert>
            </Collapse>
        )
    }

    return(
        <div style={{'display': "flex", "flexDirection": "column"}}>
        <Card style={{ display: "flex", flexDirection: "column"}}>
            { errorAllert() }
            { successAllert() }
            <div style={{"margin": "2rem"}}>
            <Box style={{"display": "flex", "flexDirection": "row"}}>
            <Avatar src={ user ? user.userImage : null }/>
                <div>
                    <Typography ml={4} variant='p' color="inherit">Hello,</Typography>
                    <Typography ml={4} variant='h6' color="inherit">{ user ? user.userName : 'loading...' }</Typography>
                </div>
            </Box>
            <div style={{"display": "flex", "flexDirection": "column"}}>
                <TextField id="name" onChange={(event) => {setNameChanged(true); setName(event.target.value)}} value={ isNameChanged ? name : user ? user.userName : "loading..." } helperText="User Name" variant="standard" />
                <TextField id="email" value={ user ? user.email : "loading..." } helperText="Email" variant="standard" />
                <TextField id="image" onChange={(event) => {setImageChanged(true); setImage(event.target.value)}} value={ isImageChanged ? image : user ? user.userImage : "loading..." } helperText="User Image Url" variant="standard" />
            </div>
            <div style={{"marginLeft": "5rem"}}>
                <Button variant="text" onClick={props.close}>close</Button>
                <Button variant="contained" onClick={() => {
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
                    console.log(csrftoken)
                    axios({
                            method: 'POST',
                            url: props.host+'/api/web/user/',
                            headers: {'X-CSRFToken': csrftoken},
                            data: {
                                'csrfmiddlewaretoken': csrftoken, 
                                "id": user.id, 
                                "userName": isNameChanged ? name : user.userName,
                                "email": user.email, 
                                "userImage": isImageChanged ? image : user.userImage, 
                                "is_active": user.is_active
                            }
                        }).then(data => {
                        setSuccessAllertOpened(true)
                    }).catch(err => {
                        setErrorAllertOpened(true)
                    })
                }} color="success">Update</Button>
            </div>
            </div>
        </Card>
        </div>
    )
}

export default Account