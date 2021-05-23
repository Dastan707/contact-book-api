import React, {useReducer} from 'react';
import axios from 'axios';
import { JSON_API } from '../helpers/constants'

export const contactContext = React.createContext();

const INIT_STATE = {
    contacts: [],
    contactToEdit: [],
    searchData: [],
}

const reducer = (state=INIT_STATE, action) => {
    switch(action.type){
        case "GET_CONTACTS_DATA" :
            return {...state, contacts: action.payload}
        case "EDIT_CONTACT" :
            return {...state, contactToEdit: action.payload}
        case "SEARCH" : 
            return {...state, searchData: action.payload}
        default : return state
    }
}

const ContactContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getContactsData = async () => {
        let { data } = await axios(`${JSON_API}/contacts`)
        // console.log(data);
        dispatch({
            type: "GET_CONTACTS_DATA",
            payload: data
        })
    }


    const addContact = async(newContact) => {
        await axios.post(`${JSON_API}/contacts`, newContact)
        getContactsData()
    }
   

    const deleteContact = async (id) => {
        await axios.delete(`${JSON_API}/contacts/${id}`)
        getContactsData()
    }

    const editContact = async (id) => {
        let { data } = await axios(`${JSON_API}/contacts/${id}`)
        // console.log(data);
        dispatch({
            type: "EDIT_CONTACT", 
            payload: data
        })
    }

    const saveContact = async (newEditedContact, history) => {
        axios.patch(`${JSON_API}/contacts/${newEditedContact.id}`, newEditedContact)
        history.push('/')
    }

    async function search(value){
        let { data } = await axios.get(`${JSON_API}/contacts?q=${value}`)
        dispatch({
            type: "SEARCH", 
            payload: data
        })
    }
   
    return (
        <contactContext.Provider value={{
            contacts: state.contacts,
            contactToEdit: state.contactToEdit,
            searchData: state.searchData,
            addContact,
            getContactsData,
            deleteContact,
            editContact,
            saveContact,
            search
        }}>
            {children}
        </contactContext.Provider>
    )
}

export default ContactContextProvider;
