import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

function CommentPage(props){

    var {id} = useParams(); const commentId = id;
    const [comment, setComment] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:4000/comments/'+commentId)
        .then(response => setComment(response.data));

        axios.get('http://localhost:4000/comments/root/'+commentId)
        .then(res=>{
            setComments(res.data);
        })
    },[])

    return(
        <div className="pt-1">
            {comment._id && (
                <div>
                <Post {...comment} open={true} />
                <CommentForm rootId={commentId} parentId={commentId} showCommentAs={true}/>
                <Comments parentId={commentId} comments={comments} />
                </div>
            )}
        </div>
    )
}

export default CommentPage;