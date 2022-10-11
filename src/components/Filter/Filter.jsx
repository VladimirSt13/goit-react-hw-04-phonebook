import PropTypes from 'prop-types';

import { Box } from 'components/Commons/Box';
import { FilterTitle } from './Filter.styled';
import { Input } from 'components/ContactForm/ContactForm.styled';

export const Filter = ({ filter, onChange }) => {
  return (
    <Box>
      <FilterTitle>Find contacts by name</FilterTitle>
      <Input type="text" name="filter" value={filter} onChange={onChange} />
    </Box>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
