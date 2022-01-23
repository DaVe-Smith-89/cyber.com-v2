import { Alert, Button, Card, CardActionArea, CardContent, CardMedia, Collapse, IconButton, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';

function CreatePost(props) {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [content, setContent] = React.useState('')
    const [image, setImage] = React.useState('')
    const [isErrorAllertOpened, setErrorAllertOpened] = React.useState(false)
    const [isSuccessAllertOpened, setSuccessAllertOpened] = React.useState(false)

    React.useEffect(() => {
        const loadScriptByURL = (id, url, callback) => {
            const isScriptExist = document.getElementById(id);
            if (!isScriptExist) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                script.id = id;
                script.onload = console.log('script loaded!')
                document.body.appendChild(script);
            }
        }
        loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${props.reCaptchaKey}`)
    });

    const errorAllert = () => {
        return(
            <Collapse in={isErrorAllertOpened}>
                <Alert severity="error" action={
                    <IconButton onClick={() => setErrorAllertOpened(false)}>
                        <CloseIcon />
                    </IconButton>}>
                    The Title, image url & <br/>
                    Description fields did <br/>
                    not exceed 200 characters <br/>
                    And the Content field should <br/>
                    not exceed 15000 characters.
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
                    </IconButton>}>
                    Post Created successfully!
                </Alert>
            </Collapse>
        )
    }

    return(
        <div style={{"display": "flex", "flexDirection": "column"}}>
            { errorAllert() }
            { successAllert() }
            <Card>
                { !image || image==='' ? null : <CardMedia component="img" height="100" src={image} alt="Post Image preview" />}
                <div style={{"padding": "1rem"}}>
                    <CardContent style={{"display": "flex", "flexDirection": "column"}}>
                        <Typography variant="h5">Create Post</Typography>
                        <TextField value={title} onChange={(event) => {setTitle(event.target.value)}} variant="standard" helperText="Post Title" />
                        <TextField value={description} onChange={(event) => {setDescription(event.target.value)}} variant="standard" helperText="Post Description" />
                        <TextField value={image} onChange={(event) => {setImage(event.target.value)}} variant="standard" helperText="Post Image url" />
                        <TextField value={content} onChange={(event) => {setContent(event.target.value)}} variant="standard" helperText="Post Content"  multiline rows={2} />
                    </CardContent>
                    <CardActionArea style={{"display": "flex", "justifyContent": "flex-end"}}>
                        <Button variant="text" onClick={() => {props.refreshAll(); props.setCreatePostOpened(false)}}>close</Button>
                        <Button variant="contained" color="success" onClick={() => {
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
                            window.grecaptcha.ready(() => {
                                window.grecaptcha.execute(props.reCaptchaKey, { action: 'submit' }).then(token => {
                                    axios({
                                        url: props.host+'/api/web/posts/',
                                        method: "POST",
                                        headers: {'X-CSRFToken': csrftoken},
                                        data: {
                                            "csrfmiddlewaretoken": csrftoken,
                                            "title": title,
                                            "image": image,
                                            "description": description,
                                            "content": content,
                                            "recaptcha": token
                                        }
                                    }).then(data => {
                                        setSuccessAllertOpened(true)
                                    }).catch(err => {
                                        setErrorAllertOpened(true)
                                    })
                                })
                            })
                        }}>create</Button>
                    </CardActionArea>
                </div>
            </Card>
        </div>
    )
}

export default CreatePost
