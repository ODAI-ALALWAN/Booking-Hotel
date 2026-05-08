import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media (max-width: 768px) {
        padding: 2rem 1.6rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;

      @media (max-width: 900px) {
        width: 100%;
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
