import './style.css'; 
import Header from './components/Header';
import AuthScreen from './components/AuthScreen';
import AuthScreenContext from './components/AuthScreenContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './components/UserContext';
import PostsListing from './components/PostsListing';
import Community from './components/Community';
import CommentPage from './components/CommentPage';
import Routing from './components/Routing';
import PostFormPopup from './components/PostFormPopup';
import PostPopupContext from './components/PostPopupContext';
import RedirectContext from './components/RedirectContext';
import { CommunityContextProvider } from './components/CommunityContext';
import { DeleteContextProvider } from './components/DeleteContext';

axios.defaults.baseURL = 'http://localhost:4000'

function App() {

  const [showPostPopup, setShowPostPopup] = useState(false);
  const [popupComment, setPopupComment] = useState(false);
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [editedPost, setEditedPost] = useState(false);
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(()=>{
 

    if(window.sessionStorage.token){
      axios.post('/user', {token: window.sessionStorage.token})
      .then((response)=>{
        setUser(response.data)
      })
      .catch((err)=>console.log());
    }
    else{
      setUser({});
    }
  },[])

  function logout(){
      setUser({});
      window.sessionStorage.removeItem("token");
  }

  return (
    <div className='bgLightGray h-100 text-light'>

      
      <AuthScreenContext.Provider value={{show:showAuthScreen, setShow: setShowAuthScreen}}>
      <UserContext.Provider value={{...user,logout, setUser}}>
      <CommunityContextProvider>
      <PostPopupContext.Provider value={{show:showPostPopup, setShow:setShowPostPopup, popupComment, setPopupComment, editedPost, setEditedPost}}>
      <RedirectContext.Provider value={{redirect, setRedirect}}>
      <DeleteContextProvider>
        <Routing/>
      </DeleteContextProvider>
      </RedirectContext.Provider>
      </PostPopupContext.Provider>
      </CommunityContextProvider>
      </UserContext.Provider>
      </AuthScreenContext.Provider>
    </div>
  );
}

export default App;
