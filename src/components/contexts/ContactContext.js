import React, {useReducer} from 'react';
import axios from 'axios';

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
        let { data } = await axios('http://localhost:8000/contacts')
        // console.log(data);
        dispatch({
            type: "GET_CONTACTS_DATA",
            payload: data
        })
    }


    const addContact = async(newContact) => {
        await axios.post('http://localhost:8000/contacts', newContact)
        getContactsData()
    }
   

    const deleteContact = async (id) => {
        await axios.delete(`http://localhost:8000/contacts/${id}`)
        getContactsData()
    }

    const editContact = async (id) => {
        let { data } = await axios(`http://localhost:8000/contacts/${id}`)
        // console.log(data);
        dispatch({
            type: "EDIT_CONTACT", 
            payload: data
        })
    }

    const saveContact = async (newEditedContact, history) => {
        axios.patch(`http://localhost:8000/contacts/${newEditedContact.id}`, newEditedContact)
        history.push('/')
    }

    async function search(value){
        let { data } = await axios.get(`http://localhost:8000/contacts?q=${value}`)
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
