import TimeAgo from 'timeago-react'
import CommentForm from './CommentForm';
import React, { useContext, useState } from 'react';
import RootCommentContext from './RootCommentContext';
import ReactMarkdown from 'react-markdown';
import gfm from "remark-gfm"
import LikesDislikes from './LikesDislikes';
import UserContext from './UserContext';
import { DeleteContext } from './DeleteContext';

function Comments(props){

    const [showCommentForm, setShowCommentForm] = useState({show:false, type:null});
    const comments = props.comments.filter(comment => props.parentId === comment.parentId);
    const  rootCommentInfo = useContext(RootCommentContext);
    const {username} = useContext(UserContext);
    const {showDeletePopup, setShowDeletePopup, setDeleteId} = useContext(DeleteContext);


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
                                <div className='d-inline'>
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

                                <button className="likeButton p-0 ms-2 m-0 d-inline-block d-inline-flex"
                                    onClick={()=>{setShowDeletePopup(true); setDeleteId(comment._id)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="likeSmall lightGray p-0 m-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                </button>
                                </div>
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