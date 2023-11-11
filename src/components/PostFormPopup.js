import ClickOutHandler from "react-clickout-handler";
import { useContext, useEffect, useState } from "react";
import PostPopupContext from "./PostPopupContext";
import axios from "axios";
import AuthScreenContext from "./AuthScreenContext";
import { Navigate, useNavigate } from "react-router-dom";

function PostFormPopup(){

    const[title,setTitle] = useState('');
    const[body,setBody] = useState('');
    const[newPostId, setNewPostId] = useState(null);
    const authContext = useContext(AuthScreenContext);
    const postPopupContext = useContext(PostPopupContext);
    const visibleClass = postPopupContext.show ? 'd-block' : 'd-none'
    const navigate = useNavigate();

    function createPost() {
    const data = {title,body};
    axios.post('http://localhost:4000/comments', data, {withCredentials:true})
      .then(response => {
        setNewPostId(response.data._id);
        setTitle('');
        setBody('');
      })
      .catch(error => {
        if (error.response.status === 401) {
          authContext.setShow('login');
        }
      });
  }

  if (newPostId) { 
    postPopupContext.setShow(false);
    var id = newPostId;
    setNewPostId(null);
    navigate("/comments/"+id);
  }

  useEffect(()=>{
    setTitle('');
    setBody('');
  },[])


    return(
        <div 
            
            className={"row position-fixed position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center z-2 "+visibleClass} 
            style={{backgroundColor: 'rgba(0,0,0,0.8)'}} //faded background 
        >   
            <form className="col-lg-4 col-md-6 col-10 text-light bgBlack border border-2 border-danger mx-auto p-4 rounded-4">
                
                <h4 className="text-light mb-4">Create a post!</h4>
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
                        onClick={()=>{postPopupContext.setShow(false); setTitle('');setBody('')}}>
                        Cancel
                    </button>

                    <button
                        className="btn btn-danger mt-3 rounded-1 pb-2 px-4 fw-bold"
                        onClick={()=>{createPost();}}>
                        Post
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default PostFormPopup;