import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Form, Label, Input, Button } from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  onSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.name.value;
    const number = e.currentTarget.number.value;

    if (this.props.checkContact(name)) {
      alert(`${name} is already is in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.props.onSubmit(contact);
    this.reset();
  };
  render() {
    const { name, number } = this.state;

    return (
      <Form autoComplete="off" onSubmit={this.onSubmit}>
        <Label htmlFor="name">
          <span>Name</span>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
          />
        </Label>

        <Label htmlFor="number">
          <span>Number</span>
          <Input
            type="tel"
            name="number"
            placeholder="Tel number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChange}
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  checkContact: PropTypes.func.isRequired,
};
