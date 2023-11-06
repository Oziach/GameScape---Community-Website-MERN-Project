import { useState, useContext} from "react";
import AuthScreenContext from "./AuthScreenContext";
import ClickOutHandler from 'react-clickout-handler';
function AuthScreen(){
    
    const [screenType, setScreenType] = useState('login');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const authContext = useContext(AuthScreenContext);
    const visibleClass = authContext.show !== false ? 'd-block' : 'd-none';

    if(authContext.show && authContext.show !== screenType){
        setScreenType(authContext.show)
    }

    return(
        <div 
            className={"row position-fixed position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center z-3 "+visibleClass} 
            style={{backgroundColor: 'rgba(0,0,0,0.6)'}} //faded background 
        >   
            <ClickOutHandler onClickOut={()=>{authContext.setShow(false)}}>
                <div className="col-lg-4 col-md-6 col-8 text-light bgBlack border mx-auto text-center">
                    {screenType === 'login' && (
                        <h1 className="mt-2">Login</h1>
                    )}

                    {screenType === 'register' &&(
                        <h1 className="mt-2">Sign Up</h1>
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

                    <button className="my-3 btn btn-light w-75 fw-bold mb-5">
                        {screenType === 'login' ? 'Log In' : 'Sign Up'}
                    </button>

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