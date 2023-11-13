import axios from "axios";
import React, { useEffect, useState } from "react"

export const CommunityContext=React.createContext({});

export function CommunityContextProvider({children}){
    
    const [show,setShow] = useState(false);
    const [communityName, setCommunityName] = useState('');
    const [communityInfo, setCommunityInfo] = useState({});

    useEffect(()=>{
        if(!communityName){
            setCommunityInfo({});
            return;
        }
        axios.get('/communities/'+communityName)
        .then(res => {
            setCommunityInfo(res.data);
        })
        
    },[communityName])

    return(
        <CommunityContext.Provider value={{show,setShow,communityName,setCommunityName, ...communityInfo}}>
            {children}
        </CommunityContext.Provider>
    )
}
