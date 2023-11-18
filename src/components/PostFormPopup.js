import { useContext, useEffect, useState } from "react";
import PostPopupContext from "./PostPopupContext";
import axios from "axios";
import AuthScreenContext from "./AuthScreenContext";
import { useNavigate } from "react-router-dom";
import { CommunityContext } from "./CommunityContext";
import UserContext from "./UserContext";

function PostFormPopup(){

    const[title,setTitle] = useState('');
    const[body,setBody] = useState('');
    const[newPostId, setNewPostId] = useState(null);
    const authContext = useContext(AuthScreenContext);
    const [type, setType] = useState(false)
    const postPopupContext = useContext(PostPopupContext);
    const visibleClass = postPopupContext.show ? 'd-block' : 'd-none'
    const navigate = useNavigate();
    const {name:communityName} = useContext(CommunityContext);
    const {token} = useContext(UserContext);
    
    function createPost() {

    if(postPopupContext.show === 'create'){

        const data = {title,body,communityName, token: window.sessionStorage.token};
        axios.post('/comments', data)
        .then(response => {
            postPopupContext.setShow(false);
            setNewPostId(response.data._id);
            setTitle('');
            setBody('');
        })
        .catch(error => {
            if(!error) {console.log("Request not sent");}
        });
    }

    else if(postPopupContext.show === 'edit'){
        const data = {commentId: postPopupContext.popupComment._id, title, body, token:window.sessionStorage.token};
        axios.post('/comments/edit', data)
        .then(response=>{
            setTitle('');
            setBody('');
            postPopupContext.setShow(false);
            setType(false);
            postPopupContext.setEditedPost(!postPopupContext.editedPost);
        })
        .catch(error=>{
            console.log(error);
        })
    }
    
  }

  if (newPostId) { 
    postPopupContext.setShow(false);
    setType(false);
    var id = newPostId;
    setNewPostId(null);
    navigate("/comments/"+id);
  }


  const topText = postPopupContext.show && postPopupContext.show === 'create' ? "Create a post" : "Edit post"

    if(postPopupContext.show === 'create' && postPopupContext.show !== type){
        setBody('');
        setTitle('');
        setType(postPopupContext.show);
    }
    else if(postPopupContext.show === 'edit' && postPopupContext.show !== type){
        if(postPopupContext.popupComment){
            setBody(postPopupContext.popupComment.body);
            setTitle(postPopupContext.popupComment.title);
            setType(postPopupContext.show);
        }
    }
    
    const postButtonContent = postPopupContext.show === 'create' ? "Post" : "Edit";
  

    return(
        <div       
            className={"row position-fixed position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center z-2 "+visibleClass} 
            style={{backgroundColor: 'rgba(0,0,0,0.8)'}} //faded background 
        >   
            <div className="col-lg-4 col-md-6 col-10 text-light bgBlack border border-2 border-danger mx-auto p-4 rounded-2">
                
                <h4 className="text-light mb-4">{topText}</h4>
                <input 
                    type='text' 
                    className="d-block text-light bgLightGray rounded-1 border-1 border-secondary w-100 px-2 py-1 mb-3"
                    placeholder="Title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    required
                />
                <textarea 
                    className="d-block text-light bgLightGray rounded-1 border-1 border-secondary w-100 px-2 py-1"
                    placeholder="Type text here :)"
                    value={body}
                    rows={10}
                    onChange={(e)=>setBody(e.target.value)}
                    required
                />
                
                <div className="text-end">
                    <button
                        className="btn btn-outline-light mt-3 rounded-1 pb-2 px-4 mx-4 fw-bold"
                        onClick={()=>{
                            postPopupContext.setShow(false);
                            setType(false)
                             setTitle('');
                            setBody('')}}>
                        Cancel
                    </button>

                    <button
                        className="btn btn-danger mt-3 rounded-1 pb-2 px-4 fw-bold"
                        onClick={()=>{createPost();}}>
                        {postButtonContent}
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default PostFormPopup;