import { useContext, useState,} from "react"
import { useNavigate } from "react-router-dom";
import { CommunityContext } from "./CommunityContext"
import AuthScreenContext from "./AuthScreenContext";
import axios from "axios";
import RedirectContext from "./RedirectContext";

function CommunityFormPopup(){
    
    const {setRedirect} = useContext(RedirectContext);
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [cardImage, setCardImage] = useState('');
    const [iconImage, setIconImage] = useState('');
    const {show, setShow} = useContext(CommunityContext);


    if(!show){
        return null;
    }

    function createCommunity(){
        const data = {name, title, iconImage, cardImage};
        axios.post('/communities/', data, {withCredentials:true})
        .then(() =>{
            setRedirect('/community/'+name);
            setShow(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    return(
        <div       
            className={"row position-fixed position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center z-2"} 
            style={{backgroundColor: 'rgba(0,0,0,0.8)'}} //faded background 
        >   
            <div className="col-lg-4 col-md-6 col-10 text-light bgBlack border border-2 border-warning mx-auto p-4 rounded-2">
                
                <h4 className="text-light mb-4">Create a new community</h4>
                <input 
                    type='text' 
                    className="d-block text-light bgLightGray rounded-1 border-1 border-secondary w-100 px-2 py-1 mb-3"
                    placeholder="Community Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                />

                <input 
                    type='text' 
                    className="d-block text-light bgLightGray rounded-1 border-1 border-secondary w-100 px-2 py-1 mb-3"
                    placeholder="Title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    required
                />
                
                <input 
                    type='text' 
                    className="d-block text-light bgLightGray rounded-1 border-1 border-secondary w-100 px-2 py-1 mb-3"
                    placeholder="Card image url"
                    value={cardImage}
                    onChange={(e)=>setCardImage(e.target.value)}
                />

                <input 
                    type='text' 
                    className="d-block text-light bgLightGray rounded-1 border-1 border-secondary w-100 px-2 py-1 mb-3"
                    placeholder="Community icon url"
                    value={iconImage}
                    onChange={(e)=>setIconImage(e.target.value)}
                />
                
                <div className="text-center">
                    <button
                        className="btn btn-outline-light mt-3 rounded-1 pb-2 px-4 mx-4 fw-bold"
                        onClick={()=>{setShow(false); setTitle('');setName('');
                                        setCardImage(''); setIconImage('');}}>
                        Cancel
                    </button>

                    <button
                        className="btn btn-warning mt-3 rounded-1 pb-2 px-4 fw-bold"
                        onClick={()=>{createCommunity();}}>
                        Create
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default CommunityFormPopup;