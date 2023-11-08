import Community from "./Community";
import Header from "./Header";
import CommentPage from "./CommentPage";
import {Routes, Route, HashRouter as Router} from 'react-router-dom'
import AuthScreen from "./AuthScreen";
import PostFormPopup from "./PostFormPopup";

function Routing(){

    return(
        <Router>
        <Header/>
          <Routes>    
            <Route path="/" Component={Community}/>
            <Route path="/comments/:id" Component={CommentPage}/>
          </Routes>
        <PostFormPopup/>
        <AuthScreen/>
        </Router>
    );
}

export default Routing;

