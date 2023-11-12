import { useContext, useState } from "react";
import UserContext from './UserContext';
import axios from "axios";
import { CommunityContext } from "./CommunityContext";


function CommentForm(props){

    const user = useContext(UserContext);
    const [commentBody, setCommentBody] = useState('');
    const[type, setType] = useState('')
    const submitText = type === 'edit' ? 'Edit' : 'Comment';

    if(props.type !== type){
        if(props.type === 'edit') {setCommentBody(props.comment.body); setType(props.type);}
        else if(props.type === 'reply') {setCommentBody(''); setType(props.type);}
         
    }

    function postComment(e){
        e.preventDefault(); 

        if(props.type==='reply'){
            const data = {body:commentBody, parentId:props.parentId, rootId:props.rootId, communityName:props.communityName}
            axios.post('/comments', data, {withCredentials:true})
            .then((res)=>{
                setCommentBody('');
                if(!!props.onSubmit){
                    props.onSubmit();
                }
            })
        }
        else if(props.type==='edit'){
            const data = {commentId:props.comment._id, title:props.comment.title, body:commentBody,}
            axios.post('/comments/edit', data, {withCredentials:true})
            .then(res=>{
                setCommentBody('');
                if(!!props.onSubmit){
                    props.onSubmit();
                }
            })
            .catch(err=>console.log(err))
        }
        
    }

    return(
    <form className={"mx-2 px-2 py-2 lightBorder border-2 " + (props.onCancel ? "mt-2":"bgDarkGray mt-2")} onSubmit={e=>postComment(e)}>
        {(
        <div>
            {user.username && props.showCommentAs && (<h6 className="fs-6 px-1 pt-2">Comment as <span className='text-danger'>{user.username}</span></h6>)}
            <textarea 
                    className="d-block text-light bgLightGray rounded-1 border-1 border-secondary w-100 px-2 py-1"
                    placeholder="Write a comment"
                    onChange={(e)=>{setCommentBody(e.target.value)}}
                    value={commentBody}
                    rows={5}
                />
                <div className="text-end">

                    {!!props.onCancel && (
                         <button
                            className="btn btn-outline-light border border-secondary mt-2 rounded-5 pb-2 px-4 fw-bold me-2"
                            onClick={e=>props.onCancel()}>
                            <span className="fw-normal">Cancel</span>
                        </button>
                    )}

                    <button
                    type="submit"
                        className="btn btn-outline-light border border-secondary mt-2 rounded-5 pb-2 px-4 fw-bold">
                        <span className="fw-normal">{submitText}</span>
                    </button>
                </div>
            
        </div>)}
    </form>)
}
export default CommentForm;