import { useParams } from "react-router-dom";
import { useState, useEffect, useContext,} from "react";
import axios from "axios";
import Post from "./Post";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import RootCommentContext from "./RootCommentContext";
import UserContext from "./UserContext";
import SortBar from "./SortBar";

function CommentPage(){

    var {id} = useParams(); const commentId = id;
    const [comment, setComment] = useState({});
    const [comments, setComments] = useState([]);
    const [commentsTotals, setCommentsTotals] = useState(null);
    const [userLikesDislikes, setUserLikesDislikes] = useState(null);
    const [sort, setSort] = useState('new');
    const {username} = useContext(UserContext);

    function refreshComments() {
        axios.get('http://localhost:4000/comments/root/'+commentId+'/?sort='+sort)
        .then((res)=>{
            setComments(res.data);
        })
    }

    function refreshLikesDislikes() {
        const commentsIds = [comment._id, ...comments];
        axios.post('http://localhost:4000/likesdislikes', {commentsIds}, {withCredentials:true})
        .then(res =>{
            setCommentsTotals(res.data.commentsTotals);
            setUserLikesDislikes(res.data.userLikesDislikes);
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:4000/comments/'+commentId)
        .then(response => {
            setComment(response.data);
            refreshComments();
        });
    },[sort])

    useEffect(()=>{
        refreshLikesDislikes();
    },[comments,username])

    return(
        <div className="pt-1">
            {comment._id && (
                <div>
                    <RootCommentContext.Provider value={{refreshComments, refreshLikesDislikes, commentsTotals, userLikesDislikes}}>
                        <Post {...comment} open={true} />
                        <CommentForm 
                            rootId={commentId}
                            parentId={commentId} 
                            showCommentAs={true}
                            onSubmit={refreshComments}
                        />     
                        <div className="mt-3 mb-0">

                        </div>
                    <SortBar sort={sort} setSort={setSort}/>
                    <Comments parentId={commentId} comments={comments} rootId={commentId} />
                </RootCommentContext.Provider>
                </div>
            )}
        </div>
    )
}

export default CommentPage;