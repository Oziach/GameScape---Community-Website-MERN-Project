import { useContext } from "react";
import PostPopupContext from "./PostPopupContext";
import UserContext from "./UserContext";
import AuthScreenContext from "./AuthScreenContext";

function PostForm(){

  const postPopupContext = useContext(PostPopupContext);
  const {username} = useContext(UserContext);
  const {setShow: setShowAuth} = useContext(AuthScreenContext);

    return(
        <div className='  bgDarkGray px-1 py-1 m-2 mt-3 mb-3 rounded-1 border border-secondary'>
        <div className='text-light rounded-1'>
          <form action="">
            <input 
              type='text' 
              className='bgLightGray text-light fs-6 rounded-1 p-1 w-100 border border-dark border-1'
              placeholder='Create a post'
              value={''}
              onChange={()=>{}}
              onFocus={(e)=>{
                e.preventDefault();
                if(username){
                  postPopupContext.setShow('create'); 
                }
                else{
                  setShowAuth('login');
                }
              }}/>
          </form>
        </div>
      </div>
    )
}

export default PostForm;