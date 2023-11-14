import PostsListing from "./PostsListing";
import CommunityHeader from './CommunityHeader';
import PostForm from './PostForm';
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CommunityContext } from "./CommunityContext";

function Community(){
    const {community: communityNameURL} = useParams();
    const {setCommunityName} = useContext(CommunityContext);

    useEffect(()=>{
        setCommunityName(communityNameURL);
    },[communityNameURL])

    return(
        <div>
            <CommunityHeader/>
            <PostForm />
            <PostsListing/>
        </div>
    )
}

export default Community;  