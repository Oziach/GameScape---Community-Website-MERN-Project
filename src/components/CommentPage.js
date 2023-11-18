import { useParams } from "react-router-dom";
import { useState, useEffect, useContext,} from "react";
import axios from "axios";
import Post from "./Post";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import RootCommentContext from "./RootCommentContext";
import UserContext from "./UserContext";
import SortBar from "./SortBar";
import PostPopupContext from "./PostPopupContext";
import { DeleteContext } from "./DeleteContext";

function CommentPage(){

    var {community, id} = useParams(); const commentId = id;
    const [comment, setComment] = useState({});
    const [comments, setComments] = useState([]);
    const [commentsTotals, setCommentsTotals] = useState(null);
    const [userLikesDislikes, setUserLikesDislikes] = useState(null);
    const [sort, setSort] = useState('new');
    const {username} = useContext(UserContext);
    const {editedPost} = useContext(PostPopupContext);
    const {deleted: deletedPost} = useContext(DeleteContext);
    const {token} = useContext(UserContext);

    function refreshComments() {
        axios.get('http://localhost:4000/comments/root/'+commentId+'/?sort='+sort)
        .then((res)=>{
            setComments(res.data);
        })
    }

    function refreshLikesDislikes() {
        const data = {commentsIds:[comment._id, ...comments],token:window.sessionStorage.token}
        axios.post('http://localhost:4000/likesdislikes', data)
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
    },[sort,editedPost,deletedPost])

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
                            communityName={comment.community}
                            showCommentAs={true}
                            onSubmit={refreshComments}
                            type={'reply'}
                        />     
                        <div className="mt-3 mb-0">

                        </div>
                    <SortBar sort={sort} setSort={setSort}/>
                    <Comments parentId={commentId} comments={comments} rootId={commentId} communityName={comment.community} />
                </RootCommentContext.Provider>
                </div>
            )}
        </div>
    )
}

export default CommentPage;