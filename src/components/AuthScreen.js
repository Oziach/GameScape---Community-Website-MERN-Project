import { useState, useContext} from "react";
import AuthScreenContext from "./AuthScreenContext";
import ClickOutHandler from 'react-clickout-handler';
import axios from 'axios'
import UserContext from "./UserContext";

function AuthScreen(){
    
    const [screenType, setScreenType] = useState('login');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const user = useContext(UserContext);
    const authContext = useContext(AuthScreenContext);
    const visibleClass = authContext.show !== false ? 'd-block' : 'd-none';

    if(authContext.show && authContext.show !== screenType){
        setScreenType(authContext.show)
    }

    function register(e) {
        e.preventDefault();
        const data = {email,username,password};
        axios.post('http://localhost:4000/register',data, {withCredentials:true})
        .then(()=>{
            user.setUser({username})
            setEmail('');
            setPassword('');
            setUsername('');
            authContext.setShow(false);
        });   
    }

    function login(){
        const data = {username, password};
        axios.post('http://localhost:4000/login',data, {withCredentials:true})
        .then(()=>{
            authContext.setShow(false);
            user.setUser({username});
        })
        
        setUsername('');
        setPassword('');
       
    }

    return(
        <div 
            className={"row position-fixed position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center z-3 "+visibleClass} 
            style={{backgroundColor: 'rgba(0,0,0,0.6)'}} //faded background 
        >   
            <ClickOutHandler onClickOut={()=>{authContext.setShow(false)}}>
                <div className="col-lg-3 col-md-6 col-10 text-light bgBlack border mx-auto text-center p-5 px-4">
                    {screenType === 'login' && (
                        <h1 className="mt-2 mb-5">Login</h1>
                    )}

                    {screenType === 'register' &&(
                        <h1 className="mt-2 mb-5">Sign Up</h1>
                    )}

                    {screenType === 'register' &&(
                        <label className="w-100">
                        <div className="text-start">Email:</div>
                        <input
                        type="text"
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}
                        className="w-100 text-light form-control bg-dark mb-2 rounded-1 border-dark"
                        />
                    </label>
                    )}

                    <label className="w-100">
                        <div className="text-start">Username:</div>
                        <input
                            type="text"
                            value={username}
                            onChange={(event)=>setUsername(event.target.value)}
                            className="w-100 form-control text-light bg-dark mb-2 rounded-1 border-dark"
                        />
                    </label>
        

                    <label className="w-100">
                        <div className="text-start">Password:</div>
                        <input 
                            type="password"
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)}
                            className="w-100 form-control mb-2 text-light rounded-1 bg-dark border-dark"
                        />
                    </label>

                    {screenType === 'login' && (
                    <button 
                        className="my-3 btn btn-light w-75 fw-bold mb-5"
                        onClick={()=>login()}>
                        Login
                    </button>
                    )}

                    {screenType === 'register' && (
                        <button
                        className="my-3 btn btn-light w-75 fw-bold mb-5"
                        onClick={e => register(e)}>
                        Sign Up
                        </button>
                    )}
                    

                    {(screenType === 'login') && (
                        <div>
                            New user? <br/>
                                <button 
                                    className="btn btn-outline-light btn-sm m-2"
                                    onClick={()=>authContext.setShow('register')}>
                                    Click here to Sign Up
                                </button>
                        </div>
                    )}
                    {(screenType === 'register') && (
                        <div>
                        Existing User? <br/>
                            <button 
                                className="btn btn-outline-light btn-sm m-2" 
                                onClick={()=>authContext.setShow('login')}>
                                Click here to Login
                            </button>
                    </div>
                    )}
                </div>
            </ClickOutHandler>
            
        </div>
    )
}

export default AuthScreen;