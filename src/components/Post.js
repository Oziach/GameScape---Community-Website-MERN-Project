function Post(props){
    return(
        <div className="hoverDanger pb-3 px-2">
            <div className='lightBorder hoverDanger hoverRed bgDarkGray px-2 text-light rounded-3 pe-pointer'>
                <h5 className='lightGray smallText mt-1 mb-1 mx-1'>Posted by {props.author} on {props.postedAt}</h5>
                <h2 className='mb-2 mx-1 fs-4'>{props.title}</h2>
                <div className="mb-3 mx-1">
                    {props.body}
                </div>
            </div>
        </div>
    )
}

export default Post;