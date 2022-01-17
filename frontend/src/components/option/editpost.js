import { Alert, Button, Card, CardContent, CardMedia, Collapse, IconButton, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';

function EditPost(props){
    const [title, setTitle] = React.useState()
    const [description, setDescription] = React.useState()
    const [image, setImage] = React.useState()
    const [content, setContent] = React.useState()
    const [isTitleChanged, setTitleChanged] = React.useState(false)
    const [isImageChanged, setImageChanged] = React.useState(false)
    const [isDescriptionChanged, setDescriptionChanged] = React.useState(false)
    const [isContentChanged, setContentChanged] = React.useState(false)
    const [isSuccessAllertOpened, setSuccessAllertOpened] = React.useState(false)
    const [isErrorAllertOpened, setErrorAllertOpened] = React.useState(false)

    const successAllert = () => {
        return(
            <Collapse in={isSuccessAllertOpened}>
                <Alert severity="success" action={
                    <IconButton onClick={() => setSuccessAllertOpened(false)}>
                        <CloseIcon />
                    </IconButton>
                }> Post Updated successfully!
                </Alert>
            </Collapse>
        )
    }

    const errorAllert = () => {
        return(
            <Collapse in={isErrorAllertOpened}>
                <Alert severity="error" action={
                    <IconButton onClick={() => setErrorAllertOpened(false)}>
                        <CloseIcon />
                    </IconButton>
                }>
                    The Title, image url & <br/>
                    Description fields did <br/>
                    not exceed 200 characters <br/>
                    And the Content field should <br/>
                    not exceed 15000 characters.
                </Alert>
            </Collapse>
        )
    }

    return(
        <Card style={{"display": "flex", "flexDirection": "column"}}>
            { errorAllert() }
            { successAllert() }
            { props.post ? props.post.image ? <CardMedia component="img" height="100" image={ props.post ? props.post.image : null } alt="Post Image" /> : null : null }
            <CardContent style={{"display": "flex", "flexDirection": "column"}}>
                <TextField  onChange={(event) => {setTitleChanged(true); setTitle(event.target.value)}} value={ isTitleChanged ? title : props.post ? props.post.title : 'loading...' } variant='standard' helperText="Post Title" />
                <TextField  onChange={(event) => {setImageChanged(true); setImage(event.target.value)}} value={ isImageChanged ? image : props.post ? props.post.image : 'loading...' } variant='standard' helperText="Post Image" />
                <TextField  onChange={(event) => {setDescriptionChanged(true); setDescription(event.target.value)}} value={ isDescriptionChanged ? description : props.post ? props.post.description : 'loading...' } variant='standard' helperText="Post Description" />
                <TextField  onChange={(event) => {setContentChanged(true); setContent(event.target.value)}} value={ isContentChanged ? content : props.post ? props.post.content : 'loading...' } variant='standard' helperText="Post Content" />
                <div style={{"marginLeft": "5rem"}}>
                    <Button color="inherit" variant='text' onClick={() => {props.closeBackDrop(false); props.refreshAll()} }>close</Button>
                    <Button color="success" variant='contained' onClick={() => {
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
                            url: String(props.host+'/api/web/posts/'+String(props.post.id)),
                            method: "POST",
                            headers: {'X-CSRFToken': csrftoken},
                            data: {
                                "csrfmiddlewaretoken": csrftoken,
                                "id": props.post.id,
                                "title": isTitleChanged ? title : props.post.title,
                                "image": isImageChanged ? image : props.post.image,
                                "description": isDescriptionChanged ? description : props.post.description,
                                "content": isContentChanged ? content : props.post.content
                            }
                        }).then(data => {
                            setSuccessAllertOpened(true)
                        }).catch(err => {
                            setErrorAllertOpened(true)
                        })
                    } }>Save</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default EditPost
