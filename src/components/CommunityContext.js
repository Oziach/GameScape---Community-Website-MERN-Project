import React, { useState } from "react"

export const CommunityContext=React.createContext({});

export function CommunityContextProvider({children}){
    const [show,setShow] = useState(false);

    return(
        <CommunityContext.Provider value={{show,setShow}}>
            {children}
        </CommunityContext.Provider>
    )
}
