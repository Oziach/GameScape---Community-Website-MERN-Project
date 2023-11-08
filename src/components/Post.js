import { Link } from "react-router-dom";

function Post(props){

    function PostContent(){
        return(
            <div className='lightBorder hoverDanger bgDarkGray px-1 text-light rounded-3'>
                <h5 className='lightGray smallText mt-1 mb-2 mx-1'>Posted by {props.author} on {props.postedAt}</h5>
                <h4 className='mb-2 mx-1'>{props.title}</h4>
                <div className="mb-2 mx-1">
                    {props.body}
                </div>
            </div>
        )
    }

    return(
        
        <div className={"pb-3 px-2 " + (props.open ? "" : "hoverDanger")} >

        {props.open && PostContent()}

        {!props.open && (<Link to={'/comments/'+props._id} className="text-decoration-none">
            {PostContent()}
        </Link>)}

        </div>
       
        
    )
}

export default Post;