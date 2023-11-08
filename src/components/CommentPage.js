import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

function CommentPage(){

    var {id} = useParams(); const commentId = id;
    const [comment, setComment] = useState({});

    useEffect(()=>{
        axios.get('http://localhost:4000/comments/'+commentId)
        .then(response => setComment(response.data));
    },[])

    return(
        <div className="pt-1">
            {comment && (
                <Post {...comment} open={true} />
            )}
        </div>
    )
}

export default CommentPage;