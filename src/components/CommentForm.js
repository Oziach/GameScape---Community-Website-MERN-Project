import { useContext, useState } from "react";
import UserContext from './UserContext';
import axios from "axios";


function CommentForm(props){

    const user = useContext(UserContext);
    const [commentBody, setCommentBody] = useState('');

    function postComment(e){
        e.preventDefault(); 
        const data = {body:commentBody, parentId:props.parentId, rootId:props.rootId,}
        axios.post('http://localhost:4000/comments', data, {withCredentials:true})
        .then((res)=>{
            setCommentBody('');
            if(!!props.onSubmit){
                props.onSubmit();
            }
        })
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
                        <span className="fw-normal">Comment</span>
                    </button>
                </div>
            
        </div>)}
    </form>)
}
export default CommentForm;