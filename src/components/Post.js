import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

function Post(props){

    const redBorder = props.open ? " border border-danger mt-1 " : ""; 

    function PostContent(){
        return(
            <div className={'lightBorder hoverDanger bgDarkGray px-1 text-light rounded-3 pb-1 border-1' + redBorder} >
                <h5 className='lightGray smallText mt-1 mb-2 mx-1'>Posted by  
                    <span className={props.open ? 'text-danger' : ''}>{" " + props.author + " "}</span> 
                    <TimeAgo datetime={props.postedAt}/>
                </h5>
                <h4 className='mb-2 mx-1'>{props.title}</h4>
                <div className="mb-2 mx-1">
                    {props.body}
                </div>
            </div>
        )
    }

    return(
        
        <div className={"pb-2 px-2 " + (props.open ? "" : "hoverDanger")} >

        {props.open && PostContent()}

        {!props.open && (<Link to={'/comments/'+props._id} className="text-decoration-none">
            {PostContent()}
        </Link>)}

        </div>
       
        
    )
}

export default Post;