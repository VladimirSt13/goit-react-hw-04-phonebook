import styled from 'styled-components';

export const Item = styled.li`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  & span:last-of-type {
    margin-left: 10px;
  }
  border-bottom: 1px solid #b7b7bf;
  &:nth-of-type(odd) {
    background-color: #b7b7bf;
  }
`;
