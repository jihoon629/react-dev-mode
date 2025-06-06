import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ToastMessage from "../common/component/ToastMessage";

const Container = styled.div`
  background-color: #f9fafb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.header`
  font-family: "Inter", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;

const Logo = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 800;
  font-size: 22px;
  color: #111827;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: #6366f1;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 3px;
    background: #6366f1;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  animation: fadeIn 1s ease forwards;
  opacity: 0;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

const NavButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  border: 2px solid #6366f1;
  border-radius: 9999px;
  padding: 8px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.2);
`;

const LoginButton = styled(NavButton)`
  background: transparent;
  color: #6366f1;

  &:hover {
    background: #eef2ff;
  }
`;

const SignupButton = styled(NavButton)`
  background: #6366f1;
  color: #ffffff;

  &:hover {
    background: #4f46e5;
  }
`;

const UserTab = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-family: "Inter", sans-serif;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background-color: #f1f5f9;
  border-radius: 20px;
  padding: 6px 12px;

  &:hover {
    background-color: #e0e7ff;
  }
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #2d3282;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  width: 160px;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`;

const LogoutButton = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: white;
  background-color: #dc3545;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;

  &:hover {
    background-color: #c82333;
  }
`;

const Footer = styled.footer`
  background-color: #1f2937;
  color: #9ca3af;
  padding: 48px 32px 24px;
  font-family: "Inter", sans-serif;
  margin-top: auto;
`;

const FooterTop = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 32px;
`;

const FooterBrand = styled.div`
  flex: 1;

  h4 {
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 12px;
  }

  p {
    margin-bottom: 16px;
  }

  .icons {
    display: flex;
    gap: 16px;

    svg {
      font-size: 18px;
      cursor: pointer;

      &:hover {
        color: #ffffff;
      }
    }
  }
`;

const FooterColumn = styled.div`
  flex: 1;

  h5 {
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 12px;
  }

  div {
    margin-bottom: 6px;
    cursor: pointer;

    &:hover {
      color: #ffffff;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #374151;
  margin-top: 32px;
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  input {
    background-color: #374151;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px 0 0 8px;
    outline: none;
  }

  button {
    background-color: #6366f1;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
  }
`;

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { realName, username } = useSelector((state) => state.user);
  const isLoggedIn = !!username;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setDropdownOpen(false);
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(logoutUser());
    sessionStorage.clear();
    navigate("/");
  };

  const handleGoMypage = () => {
    navigate("/mypage");
    setDropdownOpen(false);
  };

  return (
    <Container>
      <ToastMessage />
      <Navbar>
        <Logo onClick={() => navigate("/")}>마침표</Logo>
        <NavButtons>
          {isLoggedIn ? (
            <UserTab>
              <UserProfile onClick={() => setDropdownOpen((prev) => !prev)}>
                <AccountCircleIcon style={{ color: "#6366f1" }} />
                <UserName>{realName || username || "사용자"}</UserName>
                {dropdownOpen ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </UserProfile>
              {dropdownOpen && (
                <DropdownMenu>
                  <DropdownItem onClick={handleGoMypage}>마이페이지</DropdownItem>
                  <DropdownItem as={LogoutButton} onClick={handleLogout}>로그아웃</DropdownItem>
                </DropdownMenu>
              )}
            </UserTab>
          ) : (
            <>
              <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
              <SignupButton onClick={() => navigate("/register")}>회원가입</SignupButton>
            </>
          )}
        </NavButtons>
      </Navbar>
      <main>
        <Outlet />
      </main>
      <Footer>
        <FooterTop>
          <FooterBrand>
            <h4>마침표</h4>
            <p>
              블록체인 기반 유언장 공증 플랫폼으로
              <br />
              소중한 당신의 마지막 뜻을 안전하게 남기세요.
            </p>
            <div className="icons">
              <FaFacebookF />
              <FaTwitter />
              <FaUser />
            </div>
          </FooterBrand>
          <FooterColumn>
            <h5>서비스</h5>
            <div onClick={() => navigate("/write")}>유언장 작성</div>
            <div>공증 서비스</div>
            <div onClick={() => navigate("/success")}>유언장 관리</div>
            <div>보안 정책</div>
          </FooterColumn>
          <FooterColumn>
            <h5>회사 정보</h5>
            <div>회사 소개</div>
            <div>이용약관</div>
            <div>개인정보처리방침</div>
            <div>문의하기</div>
          </FooterColumn>
        </FooterTop>
        <FooterBottom>
          <div>© 2023 마침표. All rights reserved.</div>
          <div>
            <input type="email" placeholder="이메일 주소" />
            <button>구독</button>
          </div>
        </FooterBottom>
      </Footer>
    </Container>
  );
};

export default AppLayout;
