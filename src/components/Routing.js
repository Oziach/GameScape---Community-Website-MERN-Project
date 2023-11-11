import Community from "./Community";
import Header from "./Header";
import CommentPage from "./CommentPage";
import {Routes, Route, HashRouter as Router, Navigate} from 'react-router-dom'
import AuthScreen from "./AuthScreen";
import PostFormPopup from "./PostFormPopup";
import { useContext, useEffect } from "react";
import RedirectContext from "./RedirectContext";
import SearchResultsPage from "./SearchResultsPage";
import CommunityFormPopup from "./CommunityFormPopup";

function Routing(){

    const {redirect, setRedirect} = useContext(RedirectContext);

    useEffect(()=>{
      setRedirect(false);
  },[redirect])

    return(
        <Router>

          <Header/>
          {redirect && (
            <Navigate replace={true} to={redirect} />
          )}

        {!redirect && (
          <>
          
          <Routes>    
            <Route path="/" Component={Community}/>
            <Route path="/comments/:id" Component={CommentPage}/>
            <Route path="/search/:text" Component={SearchResultsPage}/>
          </Routes>
        <PostFormPopup/>
        <CommunityFormPopup/>
        <AuthScreen/>
          </>
        )}
        </Router>
    );
}

export default Routing;

