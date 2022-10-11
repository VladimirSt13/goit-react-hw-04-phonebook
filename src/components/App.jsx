import { useState, useEffect } from 'react';

import { Box } from 'components/Commons/Box';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('phoneBook', initialContacts);
  const [filter, setFilter] = useState('');

  const handleChangeFilter = e => {
    setFilter(e.target.value.toLowerCase().trim());
  };

  const addContact = contact => {
    setContacts(prev => [contact, ...prev]);
  };

  const deleteContact = contactId => {
    setContacts(prev => [...prev.filter(contact => contact.id !== contactId)]);
  };

  const checkContact = newName =>
    contacts.find(({ name }) => name === newName) ? true : false;

  const outputContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  return (
    <Box width="1024px" mx="auto" display="flex" gap="20px">
      <Box>
        <Box as="h1">Phonebook</Box>
        <ContactForm onSubmit={addContact} checkContact={checkContact} />
      </Box>
      <Box ml="10px">
        <Box as="h2">Contacts</Box>
        <Filter filter={filter} onChange={handleChangeFilter} />
        <ContactList
          outputContacts={outputContacts}
          onDeleteContact={deleteContact}
        />
      </Box>
    </Box>
  );
};
