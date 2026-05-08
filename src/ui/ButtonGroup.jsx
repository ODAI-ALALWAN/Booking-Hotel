import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: stretch;

    & > * {
      flex: 1;
      text-align: center;
    }
  }
`;

export default ButtonGroup;
