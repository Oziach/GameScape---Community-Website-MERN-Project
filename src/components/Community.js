import PostsListing from "./PostsListing";
import CommunityHeader from './CommunityHeader';
import PostForm from './PostForm';

function Community(){
    return(
        <div>
            <CommunityHeader/>
            <PostForm />
            <PostsListing/>
        </div>
    )
}

export default Community;  