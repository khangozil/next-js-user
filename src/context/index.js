'use client'
import { addNewUserFormInitialState } from "@/utils";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserState({children}){
    const [openPopUp, setOpenPopUp] = useState(false);
    const [addNewUserFromData , setAddNewUserFromData] = useState(addNewUserFormInitialState);
    const [currentEditedID , setCurrentEditedID] = useState(null);
    

    return <UserContext.Provider value={{currentEditedID , setCurrentEditedID , openPopUp , setOpenPopUp , addNewUserFromData , setAddNewUserFromData }}>{children}</UserContext.Provider>
}