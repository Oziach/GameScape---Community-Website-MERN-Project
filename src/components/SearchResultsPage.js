import { redirect, useParams } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import axios from "axios";
import Post from "./Post";
import RootCommentContext from "./RootCommentContext";
import { CommunityContext } from "./CommunityContext";
import { DeleteContext } from "./DeleteContext";
import PostPopupContext from "./PostPopupContext";

function SearchResultsPage(){
    const {text} = useParams();
    const [comments, setComments] = useState([]);
    const [commentsTotals, setCommentsTotals] = useState(null);
    const [userLikesDislikes, setUserLikesDislikes] = useState(null);
    const {communityName: community} = useContext(CommunityContext);
    const {editedPost} = useContext(PostPopupContext);
    const {deleted} = useContext(DeleteContext);

    useEffect(()=>{
        axios.get('/comments?search='+text+'&community='+community, {withCredentials:true})
        .then(response=>{
          setComments(response.data)
        });
    },[editedPost, deleted])
   
    useEffect(()=>{
      refreshLikesDislikes();
    },[comments])


    function refreshLikesDislikes() {
      const commentsIds = [...comments];
      axios.post('http://localhost:4000/likesdislikes', {commentsIds}, {withCredentials:true})
      .then(res =>{
          setCommentsTotals(res.data.commentsTotals);
          setUserLikesDislikes(res.data.userLikesDislikes);
      })
    }


    return(  
        <div>
          {comments.map(comment => (
            <RootCommentContext.Provider value={{refreshLikesDislikes, commentsTotals, userLikesDislikes}}>
              <Post {...comment} open={false}/>
            </RootCommentContext.Provider>
          ))}
        </div>
    )
}

export default SearchResultsPage;

