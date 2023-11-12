import TimeAgo from 'timeago-react'
import CommentForm from './CommentForm';
import React, { useContext, useState } from 'react';
import RootCommentContext from './RootCommentContext';
import ReactMarkdown from 'react-markdown';
import gfm from "remark-gfm"
import LikesDislikes from './LikesDislikes';
import UserContext from './UserContext';

function Comments(props){

    const [showCommentForm, setShowCommentForm] = useState({show:false, type:null});
    const comments = props.comments.filter(comment => props.parentId === comment.parentId);
    const  rootCommentInfo = useContext(RootCommentContext);
    const {username} = useContext(UserContext);

    return(
        <div className="mt-0">
                {comments.map(comment => {
                    const replies = props.comments.filter(c=>c.parentId === comment._id);
                    return (
                    <div className="border-2 lightBorder bgDarkGray px-2 mx-2 py-1 rounded my-1 pe-0">
                        <div className="text-light smallText">
                            <span className="text-danger"> {comment.author} </span>
                            replied <TimeAgo datetime={comment.postedAt}/>
                        </div>
                        <div>
                            <ReactMarkdown remarkPlugins={[gfm]} children={comment.body} />
                        </div>
                        <div>

                            <LikesDislikes commentId={comment._id}/>

                            <button className='btn btn-sm p-0 mt-0 ms-2 pb-1 border-0 pb-1 bg-transparent rounded-1'
                                onClick={()=> {
                                    if(showCommentForm.show){

                                        if(showCommentForm.type && showCommentForm.type==='edit'){
                                            setShowCommentForm({show:comment._id, type:'reply'})
                                        }
                                        else setShowCommentForm({show:false,type:null})
                                    } 
                                    else {
                                        setShowCommentForm({show:comment._id, type:'reply'})
                                    }}}>
                                    
                                <span className='smallishText fw-bolder lightGray py-0'>Reply</span>
                            </button>

                            {comment.author === username &&(
                                <button className='btn btn-sm p-0 mt-0 ms-2 pb-1 border-0 pb-1 bg-transparent rounded-1'
                                onClick={()=> {
                                    if(showCommentForm.show){
                                        if(showCommentForm.type && showCommentForm.type==='reply'){
                                            setShowCommentForm({show:comment._id,type:'edit'})
                                        }
                                        else setShowCommentForm({show:false,type:null})
                                    } 
                                    else {
                                        setShowCommentForm({show:comment._id, type:'edit'})
                                    }}}>
                                   
                                <span className='smallishText fw-bolder lightGray py-0'>Edit</span>
                            </button>
                            )}
                            

                            {comment._id === showCommentForm.show && (
                                <CommentForm 
                                    showCommentAs={false} 
                                    onCancel={e=>setShowCommentForm({show:false})}
                                    parentId={comment._id}
                                    rootId={props.rootId}
                                    communityName={props.communityName}
                                    type={showCommentForm.type}
                                    comment={comment}
                                    onSubmit={()=>{
                                        setShowCommentForm({show:false});
                                        rootCommentInfo.refreshComments();
                                    
                                    }}
                                />
                            )}  
                            {replies.length > 0 && (
                                <Comments comments={props.comments} parentId={comment._id} rootId={props.rootId} communityName={props.communityName}/>
                            )}
                        </div>
                    </div>
                )})}
        </div>
    )
}

export default Comments;