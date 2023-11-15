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
import DeletePopup from "./DeletePopup";
import LandingPage from "./LandingPage";
import GameSearchResultsPage from "./GameSearchResultsPage";

function Routing(){

    const {redirect, setRedirect} = useContext(RedirectContext);

    useEffect(()=>{
      if(redirect) setRedirect(false);
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
            <Route exact path="/community/:community" Component={Community}/>
            <Route exact path="/comments/:id" Component={CommentPage}/>
            <Route exact path="/search/:community/:text" Component={SearchResultsPage}/>
            <Route exact path="/search/:text" Component={GameSearchResultsPage}/>
            <Route exact path="/" Component={LandingPage}/>
          </Routes>
          <DeletePopup/>
        <PostFormPopup/>
        <CommunityFormPopup/>
        <AuthScreen/>
          </>
        )}
        </Router>
    );
}

export default Routing;

