import { redirect, useParams } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import axios from "axios";
import Post from "./Post";
import RootCommentContext from "./RootCommentContext";
import {CommunityContext } from "./CommunityContext";
import { DeleteContext } from "./DeleteContext";
import PostPopupContext from "./PostPopupContext";

function SearchResultsPage(){
    const {community, text} = useParams();
    const [comments, setComments] = useState([]);
    const [commentsTotals, setCommentsTotals] = useState(null);
    const [userLikesDislikes, setUserLikesDislikes] = useState(null);
    const {editedPost} = useContext(PostPopupContext);
    const {deleted} = useContext(DeleteContext);
    const {name:CommunityContextName, setCommunityName} = useContext(CommunityContext);

    useEffect(()=>{
        axios.get('/comments?search='+text+'&community='+community, {withCredentials:true})
        .then(response=>{
          if(!CommunityContextName){setCommunityName(community)} //this is extremely jank
          setComments(response.data)
        });
    },[editedPost, deleted])
   
    useEffect(()=>{
      refreshLikesDislikes();
    },[comments])


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
          {comments.map(comment => (
            <RootCommentContext.Provider value={{refreshLikesDislikes, commentsTotals, userLikesDislikes}}>
              <Post {...comment} open={false}/>
            </RootCommentContext.Provider>
          ))}
        </div>
    )
}

export default SearchResultsPage;

