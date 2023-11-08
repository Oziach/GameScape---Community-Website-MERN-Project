function PostForm(){
    return(
        <div className='bgDarkGray px-1 py-1 m-2 mt-3 mb-4 rounded-1 border border-secondary'>
        <div className='text-light rounded-1'>
          <form action="">
            <input 
              type='text' 
              className='bgLightGray text-light fs-6 rounded-1 p-1 w-100 border border-dark border-1'
              placeholder='Create a post'/>
          </form>
        </div>
      </div>
    )
}

export default PostForm;