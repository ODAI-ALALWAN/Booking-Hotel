import styled from "styled-components";
// import { useDarkMode } from "../context/DarkModeContext";
import { SiHilton } from "react-icons/si";

const StyledLogo = styled.div`
  text-align: center;
`;

// const Img = styled.img`
//   height: 9.6rem;
//   width: auto;
// `;

function Logo() {
  // const { isDarkMode } = useDarkMode()
  // const src = isDarkMode ? '/LOGODARK.png' : '/LOGO.png'
  return (
    <StyledLogo>
      <SiHilton
        style={{
          width: "5rem",
          height: "5rem",
          color: "var(--color-brand-600)",
        }}
      />
    </StyledLogo>
  );
}

export default Logo;
