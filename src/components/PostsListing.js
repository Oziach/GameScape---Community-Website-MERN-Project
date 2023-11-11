import Post from "./Post";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RootCommentContext from "./RootCommentContext";
import UserContext from "./UserContext";
import SortBar from "./SortBar";

function PostsListing(){

    const [comments, setComments] = useState([]);
    const [commentsTotals, setCommentsTotals] = useState(null);
    const [userLikesDislikes, setUserLikesDislikes] = useState(null);
    const [sort, setSort] = useState('new');

    const {username} = useContext(UserContext);
    
    useEffect(()=>{
        axios.get('http://localhost:4000/comments?sort='+sort, {withCredentials:true})
        .then(response=>{
          setComments(response.data)
        });
    },[sort,username])
   
    useEffect(()=>{
      refreshLikesDislikes();
    },[comments,username])

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