import PropTypes from 'prop-types';
import { Item } from './Contact.styled';

export const Contact = ({ contact, onDeleteContact }) => {
  const { id, name, number } = contact;
  return (
    <Item>
      <div>
        <span>{name}:</span> <span>{number}</span>
      </div>
      <button onClick={() => onDeleteContact(id)}>Delete</button>
    </Item>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,

  onDeleteContact: PropTypes.func.isRequired,
};
