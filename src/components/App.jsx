import { Component } from 'react';

import { Box } from 'components/Commons/Box';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('phoneBook');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('phoneBook', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addContact = contact => {
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts: prevContacts }) => ({
      contacts: prevContacts.filter(contact => contact.id !== contactId),
    }));
  };

  checkContact = newName =>
    this.state.contacts.find(({ name }) => name === newName) ? true : false;

  render() {
    const { filter } = this.state;
    const outputContacts = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <Box width="1024px" mx="auto" display="flex" gap="20px">
        <Box>
          <Box as="h1">Phonebook</Box>
          <ContactForm
            onSubmit={this.addContact}
            checkContact={this.checkContact}
          />
        </Box>
        <Box ml="10px">
          <Box as="h2">Contacts</Box>
          <Filter filter={filter} onChange={this.handleChange} />
          <ContactList
            outputContacts={outputContacts}
            onDeleteContact={this.deleteContact}
          />
        </Box>
      </Box>
    );
  }
}
