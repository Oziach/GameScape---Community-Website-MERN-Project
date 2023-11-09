import TimeAgo from 'timeago-react'
import CommentForm from './CommentForm';
import { useState } from 'react';

function Comments(props){

    const [showCommentForm, setShowCommentForm] = useState(false);
    const comments = props.comments.filter(comment => props.parentId === comment.parentId);

    return(
        <div className="mt-3">
                {comments.map(comment => {
                    const replies = props.comments.filter(c=>c.parentId === comment._id);
                    return (
                    <div className="border-2 lightBorder bgDarkGray px-2 mx-2 py-1 rounded my-1">
                        <div className="text-light smallText">
                            <span className="text-danger"> {comment.author} </span>
                            replied <TimeAgo datetime={comment.postedAt}/>
                        </div>
                        <div className=''>
                            {comment.body}
                        </div>
                        <div>
                            <button className='btn btn-sm p-0 mt-1 border-0 pb-1 btn-outline-secondary bg-transparent rounded-1'
                                onClick={()=> setShowCommentForm(comment._id)}>
                                <span className='smallishText fw-bolder lightGray py-0'>Reply</span>
                            </button>

                            {comment._id === showCommentForm && (
                                <CommentForm 
                                    showCommentAs={false} 
                                    onCancel={e=>setShowCommentForm(false)}
                                    parentId={comment._id}
                                    rootId={props.parentId}
                                    onSubmit={()=>{setShowCommentForm(false);}}
                                />
                            )}  
                            {replies.length > 0 && (
                                <div className='text-light'>Here are replies</div>
                            )}
                        </div>
                    </div>
                )})}
        </div>
    )
}

export default Comments;