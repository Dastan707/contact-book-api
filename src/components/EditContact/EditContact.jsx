import React, { useContext, useEffect, useState } from 'react';
import { contactContext } from '../contexts/ContactContext';

const EditContact = (props) => {
    const { contactToEdit, saveContact } = useContext(contactContext)
    const [newEditItem, setEditItem] = useState(contactToEdit)


    useEffect(() => {
        setEditItem(contactToEdit)
    }, [contactToEdit])

    function handleEditInputName(e){
        let newEditedContact = {
            ...newEditItem,
            name: e.target.value
        }
        setEditItem(newEditedContact)
    } 
    
    function handleEditInputSurname(e){
        let newEditedContact = {
            ...newEditItem,
            surname: e.target.value
        }
        setEditItem(newEditedContact)
    }

    
    function handleEditInputEmail(e){
        let newEditedContact = {
            ...newEditItem,
            email: e.target.value
        }
        setEditItem(newEditedContact)
    }

    
    function handleEditInputPhone(e){
        let newEditedContact = {
            ...newEditItem,
            phone: e.target.value
        }
        setEditItem(newEditedContact)
    }
    return (
        <div>
           <input
            onChange={handleEditInputName}
            value={newEditItem.name} type="text"
            />
            <input 
            onChange={handleEditInputSurname} 
            value={newEditItem.surname} type="text"
            />
            <input 
            onChange={handleEditInputEmail} 
            value={newEditItem.email} type="text"
            />
            <input 
            onChange={handleEditInputPhone} 
            value={newEditItem.phone} type="text"
            />
            <button onClick={() => saveContact(newEditItem, props.history)}>Save</button>
        </div>
    );
};

export default EditContact;