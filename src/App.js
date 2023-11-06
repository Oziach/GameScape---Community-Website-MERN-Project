import './style.css';
import Header from './components/Header';
import CommunityHeader from './components/CommunityHeader';
import PostForm from './components/PostForm';
import AuthScreen from './components/AuthScreen';
import AuthScreenContext from './components/AuthScreenContext';
import { useState } from 'react';

function App() {
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  return (
    <div className='bgLightGray'>

      <AuthScreenContext.Provider value={{show:showAuthScreen, setShow: setShowAuthScreen}}>
        <Header/>
        <AuthScreen/>
        <CommunityHeader/>
        <PostForm />


        <div className='lightBorder bgDarkGray px-2 text-light rounded-3 m-3 pt-1'>
          <h5 className='lightGray smallText mt-1 mb-1'>Posted by Rube432</h5>
          <h2 className='mb-2 fs-2'>Test</h2>
          <div>
          <p>A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          </p>
          </div>
        </div>

        <div className='lightBorder bgDarkGray px-2 text-light rounded-3 m-3 pt-1'>
          <h5 className='lightGray smallText mt-1 mb-1'>Posted by Rube432</h5>
          <h2 className='mb-2 fs-2'>Test</h2>
          <div>
          <p>A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          </p>
          </div>
        </div>

        <div className='lightBorder bgDarkGray px-2 text-light rounded-3 m-3 pt-1'>
          <h5 className='lightGray smallText mt-1 mb-1'>Posted by Rube432</h5>
          <h2 className='mb-2 fs-2'>Test</h2>
          <div>
          <p>A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          A ton of textA ton of textA ton of textA ton of textA ton of textA ton 
          </p>
          </div>
        </div>
      </AuthScreenContext.Provider>
    </div>
  );
}

export default App;
