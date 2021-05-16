import React, {useContext, useState} from 'react';
import { contactContext } from '../contexts/ContactContext';

const AddContact = () => {

    const [inpName, setInpName] = useState('');
    const [inpSurname, setInpSurname] = useState('');
    const [inpEmail, setInpEmail] = useState('');
    const [inpPhone, setInpPhone] = useState('');

    const [searchValue, setSearchValue] = useState('');

    

    const { addContact, search, searchData } = useContext(contactContext)

    const handleValue = (e) => {
        setSearchValue(e.target.value)
        search(e.target.value)
        console.log(e.target.value);
    }

    function handleClick() {
        let newContact = {
            name: inpName,
            surname: inpSurname,
            email: inpEmail,
            phone: inpPhone,
            id:Date.now()
        }

        if(inpName === ''){
            alert('Не все поля заполнены')
        }
 
        addContact(newContact);
        // console.log(newContact);
        setInpName('');
        setInpSurname('');
        setInpEmail('');
        setInpPhone('');
    }   


    return (
        <div>
            <input
            onChange={(e) => setInpName(e.target.value)}
            value={inpName} type="text" placeholder="Name"
            />
            <input 
            onChange={(e) => setInpSurname(e.target.value)} 
            value={inpSurname} type="text" placeholder="Surname"
            />
            <input 
            onChange={(e) => setInpEmail(e.target.value)} 
            value={inpEmail} type="text" placeholder="Email"
            />
            <input 
            onChange={(e) => setInpPhone(e.target.value)} 
            value={inpPhone} type="text" placeholder="Phone"
            />
            <button onClick={handleClick}>Add Contact</button>
            <br></br>
            <input onChange={handleValue} placeholder="Поиск" />
            {searchData.map(item => (
                <ul>
                <li>{item.name}</li>
                <li>{item.surname}</li>
                <li>{item.email}</li>
                <li>{item.phone}</li>
                </ul>
            ))}
        </div>
    );
};

export default AddContact;