import './style.css'; 
import Header from './components/Header';
import AuthScreen from './components/AuthScreen';
import AuthScreenContext from './components/AuthScreenContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './components/UserContext';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import PostsListing from './components/PostsListing';
import Community from './components/Community';

function App() {

  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(()=>{
    axios.get('http://localhost:4000/user', {withCredentials:true})
    .then((response)=>{
      setUser(response.data)
    })
    .catch((err)=>console.log());
  })

  function logout(){
    axios.post('http://localhost:4000/logout',{},{withCredentials:true})
    .then(()=>setUser({}));
  }

  return (
    <div className='bgLightGray h-100'>

      <AuthScreenContext.Provider value={{show:showAuthScreen, setShow: setShowAuthScreen}}>
        <UserContext.Provider value={{...user,logout, setUser}}>
        <Header/>

        <Router>
          <Routes>
            <Route path="/" Component={Community}/>
          </Routes>
        </Router>

        <AuthScreen/>
        </UserContext.Provider>
      </AuthScreenContext.Provider>
    </div>
  );
}

export default App;
