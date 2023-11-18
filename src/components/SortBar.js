function SortBar(props){

    const sortButtonClass = props.sort ? "border border-danger text-danger" : "border-secondary text-secondary"

    return(
        <div className="">
              
              <div className="d-inline-block ms-3 me-2 mb-2 mt-0 lightGray">
                <span className="sortBy">Sort by:</span>
              </div>
                <button className={"likeButton fw-bold border-secondary text-secondary border smallishText rounded-4 px-3 mb-3 py-1 hoverDanger" + (props.sort === 'new' && (sortButtonClass))}
                  onClick={()=>{props.setSort('new')}}
                >
                    New
                </button>
                <button className={"likeButton text-secondary fw-bold border px-3 border-secondary py-1 smallishText rounded-4 px-2 mb-3 ms-2 hoverDanger" + (props.sort === 'likes' && (sortButtonClass))}
                   onClick={()=>{props.setSort('likes')}}>
                    Likes
                </button> 
            </div>
    )
}

export default SortBar;