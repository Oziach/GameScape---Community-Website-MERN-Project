import Avatar from '../avatar.png';
import Button from './Button';
import AuthScreenContext from './AuthScreenContext';
import { useContext } from 'react';


function Header(){

    const authContext = useContext(AuthScreenContext);

    return(
        <header className='position-fixed top-0 w-100'>
            <div className="navbar bgBlack py-1 px-1">

                <div className="navbar-brand text-light mx-2 me-3 fs-5">GamersChat (Temporary Name) </div>

                <form action="" className='w-50 nav'>
                <input type="text" className="w-100 navSmall border-3 border-danger rounded-0" placeholder="Search" />
                </form>
                <div>
                
                <div className='nav me-3'>
                    <button 
                        className='btn btn-outline-light btn-sm fw-bold rounded-4 px-3 mx-1'
                        onClick={()=>{authContext.setShow('login')}}
                    >
                        Login
                    </button>
                    <button 
                        className='btn btn-outline-light btn-sm fw-bold rounded-4 px-3 mx-1'
                        onClick={()=>{authContext.setShow('register')}}
                    >
                        Sign Up 
                    </button>
                </div>
                
                
                {/* <button 
                    className="btn btn-sm btn-outline-light rounded-1 mx-2">
                    Create Post
                </button>
                
                <button className='btn btn-dark'>
                     <img src={Avatar} className='navSmall' />
                </button> */}
                </div>

            </div>

        </header>
      
    )

}

export default Header;