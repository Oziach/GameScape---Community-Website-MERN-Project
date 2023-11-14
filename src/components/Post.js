import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import ReactMarkdown from 'react-markdown'
import LikesDislikes from "./LikesDislikes";
import { useContext } from "react";
import { CommunityContext } from "./CommunityContext";
import PostPopupContext from "./PostPopupContext";
import UserContext from "./UserContext";
import { DeleteContext } from "./DeleteContext";

function Post(props){

    const redBorder = props.open ? " border border-danger mt-1 " : ""; 
    const {communityName, setCommunityName} = useContext(CommunityContext);
    const {show:showPopup, setShow: setShowPopup, popupComment, setPopupComment} = useContext(PostPopupContext);
    const {username} = useContext(UserContext);
    const {setShowDeletePopup, setDeleteId} = useContext(DeleteContext);

    function PostContent(){
        return(
            
            <div className={'lightBorder bgDarkGray px-1 text-light rounded-3 pb-1 border-1 z-1' + redBorder}>
                <div className="d-flex justify-content-between">
                    <h5 className='lightGray smallText mt-1 mb-1 mx-1'>Posted by  
                        <span className={props.open ? 'text-danger' : ''}>{" " + props.author + " "}</span> 
                        <TimeAgo datetime={props.postedAt}/>
                    </h5>
                    {props.open && (<div className="d-inline-block">
                        {username === props.author && (
                        <div className="d-inline-block">

                            <button className="likeButton p-0 m-0 d-inline-block d-inline-flex"
                                onClick={()=>{setShowDeletePopup(true); setDeleteId(props._id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="likeSmall lightGray p-0 m-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            </button>

                            <button className='btn btn-sm p-0 mt-0 ms-2 pb-1 border-0 pb-1 bg-transparent rounded-1 d-inline-block hoverDanger'
                                onClick={()=> {
                                    setShowPopup('edit');
                                    setPopupComment({_id: props._id,title: props.title,body: props.body})       
                                }}>                       
                                <span className='smallishText fw-bolder lightGray py-0 me-2 hoverDanger'>Edit</span>
                            </button>
                        </div>
                    )}
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

                    {username === props.author && (
                        <span>
                            <button className="likeButton p-0 m-0 d-inline-block d-inline-flex"
                             onClick={()=>{setShowDeletePopup(true); setDeleteId(props._id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="likeSmall lightGray p-0 m-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            </button>

                            <button className='btn btn-sm p-0 mt-0 ms-2 pb-1 border-0 pb-1 bg-transparent rounded-1 hoverDanger'
                            onClick={()=> {
                                setShowPopup('edit');
                                setPopupComment({_id: props._id,title: props.title,body: props.body})          
                            }}>                       
                            <span className='smallishText fw-bolder lightGray py-0 me-3 hoverDanger '>Edit</span>
                            </button>
                        </span>
                    )}
                   

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