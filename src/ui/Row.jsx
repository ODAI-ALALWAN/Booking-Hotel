import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

  @media (max-width: 768px) {
    ${(props) =>
      props.type === "horizontal" &&
      css`
        flex-direction: column;
        align-items: stretch;
        gap: 1.2rem;
      `}
  }
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
