import react, { useState } from 'react'

export const DeleteContext = react.createContext({});

export function DeleteContextProvider({children}){

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleted, setDeleted] = useState(false);

    return(
        <DeleteContext.Provider value={{showDeletePopup, setShowDeletePopup, deleteId, setDeleteId, deleted, setDeleted}}>
            {children}
        </DeleteContext.Provider>
    )
   
}