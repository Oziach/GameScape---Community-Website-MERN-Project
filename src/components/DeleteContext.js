import react, { useState } from 'react'

export const DeleteContext = react.createContext({});

export function DeleteContextProvider({children}){

    const [showDeletePopup, setShowDeletePopup] = useState(false);

    return(
        <DeleteContext.Provider value={{showDeletePopup, setShowDeletePopup}}>
            {children}
        </DeleteContext.Provider>
    )
   
}