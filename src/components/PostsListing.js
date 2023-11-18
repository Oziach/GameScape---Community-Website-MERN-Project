import Post from "./Post";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RootCommentContext from "./RootCommentContext";
import UserContext from "./UserContext";
import SortBar from "./SortBar";
import { CommunityContext } from "./CommunityContext";
import PostPopupContext from "./PostPopupContext";
import { DeleteContext } from "./DeleteContext";

function PostsListing(){

    const [comments, setComments] = useState([]);
    const [commentsTotals, setCommentsTotals] = useState(null);
    const [userLikesDislikes, setUserLikesDislikes] = useState(null);
    const [sort, setSort] = useState('new');
    const {name:community} = useContext(CommunityContext);
    const {username} = useContext(UserContext);
    const {editedPost} = useContext(PostPopupContext);
    const {deleted: deletedPost} = useContext(DeleteContext);

    useEffect(()=>{
        refreshListingComments();
      },[sort,community,editedPost,deletedPost]);
   
    useEffect(()=>{
      refreshLikesDislikes();
    },[comments,username])

    function refreshListingComments(){
      axios.get('/comments?sort='+sort+'&community='+community, {withCredentials:true})
        .then(response=>{
          setComments(response.data)
        });
    }

    function refreshLikesDislikes() {
      const commentsIds = [...comments];
      axios.post('/likesdislikes', {commentsIds}, {withCredentials:true})
      .then(res =>{ 
          setCommentsTotals(res.data.commentsTotals);
          setUserLikesDislikes(res.data.userLikesDislikes);
      })
    }

    return(  
        
        <div>
          <SortBar sort={sort} setSort={setSort}/>
          {comments.map(comment => (
            <RootCommentContext.Provider value={{refreshLikesDislikes, commentsTotals, userLikesDislikes}}>
              <Post {...comment} open={false}/>
            </RootCommentContext.Provider>
          ))}
        </div>
    )
}

export default PostsListing;