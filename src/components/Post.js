import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import ReactMarkdown from 'react-markdown'
import LikesDislikes from "./LikesDislikes";
import { useContext } from "react";
import { CommunityContext } from "./CommunityContext";

function Post(props){

    const redBorder = props.open ? " border border-danger mt-1 " : ""; 
    const {communityName, setCommunityName} = useContext(CommunityContext);
    
    function PostContent(){
        return(
            
            <div className={'lightBorder bgDarkGray px-1 text-light rounded-3 pb-1 border-1 z-1' + redBorder}>
                <div className="d-flex justify-content-between">
                    <h5 className='lightGray smallText mt-1 mb-1 mx-1'>Posted by  
                        <span className={props.open ? 'text-danger' : ''}>{" " + props.author + " "}</span> 
                        <TimeAgo datetime={props.postedAt}/>
                    </h5>
                    {props.open && (<div>
                    <LikesDislikes commentId={props._id}/>
                    </div>)}
                    
                </div>
                
                <h4 className='mb-2 mx-1'>{props.title}</h4>
                <div className="mb-2 mx-1">
                <ReactMarkdown children={props.body} />
                </div>
            </div>
        )
    }

    return(
        
        <div className={"pb-1 px-2 " + (props.open ? "" : "hoverDanger")} >
            
        
        {props.open && PostContent()}
        {props.open && (!communityName) && setCommunityName(props.community)}

        {!props.open && (
            <div>
                
                <div className="position-relative w-0 h-0">
                   <div className="position-absolute end-0 me-1 mt-1">
                    <LikesDislikes commentId={props._id} size='small'/>
                   </div>
                </div>
                <Link to={'/comments/'+props._id} className="text-decoration-none z-1">
                    {PostContent()}
                </Link>
            </div>)}

        </div>
       
        
    )
}

export default Post;