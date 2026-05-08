import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Upload from "../data/Upload.jsx";
import { useContext } from "react";
import { SidebarContext } from "./AppLayout";
import { HiXMark } from "react-icons/hi2";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 28rem;
    height: 100vh;
    z-index: 1000;
    transform: ${(props) =>
      props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease-in-out;
    box-shadow: ${(props) =>
      props.$isOpen ? "var(--shadow-lg)" : "none"};
  }
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  align-self: flex-end;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  return (
    <StyledSidebar $isOpen={isSidebarOpen}>
      <CloseButton onClick={() => setIsSidebarOpen(false)}>
        <HiXMark />
      </CloseButton>
      <Logo />
      <MainNav />
      {/* <Upload /> */}
    </StyledSidebar>
  );
}

export default Sidebar;
