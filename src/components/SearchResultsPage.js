import { redirect, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import RootCommentContext from "./RootCommentContext";

function SearchResultsPage(){
    const {text} = useParams();
    const [comments, setComments] = useState([]);
    const [commentsTotals, setCommentsTotals] = useState(null);
    const [userLikesDislikes, setUserLikesDislikes] = useState(null);

    useEffect(()=>{
        axios.get('http://localhost:4000/comments?search='+text, {withCredentials:true})
        .then(response=>{
          setComments(response.data)
        });
    },[])
   
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

