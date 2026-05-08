import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { useContext } from "react";
import { SidebarContext } from "./AppLayout";
import { HiOutlineBars3 } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";


const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    padding: 1.2rem 1.6rem;
    justify-content: space-between;
    gap: 1.2rem;
  }
`;

const MobileMenuButton = styled(ButtonIcon)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-600);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

function Header() {
  const { setIsSidebarOpen } = useContext(SidebarContext);

  return (
    <StyledHeader>
      <MobileMenuButton onClick={() => setIsSidebarOpen((open) => !open)}>
        <HiOutlineBars3 />
      </MobileMenuButton>
      <HeaderRight>
        <UserAvatar />
        <HeaderMenu />
      </HeaderRight>
    </StyledHeader>
  );
}

export default Header;
