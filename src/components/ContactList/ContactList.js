import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contactContext } from '../contexts/ContactContext';
import './ContactList.css'

const ContactList = () => {
    const {contacts, getContactsData, deleteContact, editContact} = useContext(contactContext);

    useEffect(() =>{
        getContactsData()
    }, [])
    return (
        <>
            {contacts.map(item => (
                <ul className='contacts-list'>
                <li>Name:{item.name}</li>
                <li>Surname:{item.surname}</li>
                <li>Email:{item.email}</li>
                <li>Phone:{item.phone}</li>
                <button
                 onClick={() => deleteContact(item.id)}
                 >
                     Delete Contact
                 </button>
                 <Link to='/edit'>
                 <button onClick={() => editContact(item.id)}>Edit Contact</button>
                 </Link>
                </ul>
            ))}
             
        </>
    );
};

export default ContactList;