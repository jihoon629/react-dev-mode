// src/pages/MyPage/MyPage.js
import React from 'react';
import {
  MyPageContainer, MyPageProfile, ProfileInfo, ProfileImage, ProfileText,
  ProfileName, ProfileEmail, ProfileDate, EditProfileButton, MyPageStats,
  StatCard, StatValue, StatLabel, MyPageActions, ActionButton, MyPageColumns,
  MyPageRecent, MyPageSide, Box, SettingsList, SettingsItem,
  LinkedServicesText, LogoutButton, ActivityItem
} from './style/MyPageStyle';
import {
  FaFileSignature,
  FaUserFriends,
  FaShieldAlt,
  FaHistory,
  FaUserShield,
  FaBell,
  FaCog,
  FaAngleRight,
  FaLink,
  FaSignOutAlt
} from 'react-icons/fa';

const MyPage = () => {
  return (
    <MyPageContainer>
      {/* 프로필 */}
      <MyPageProfile>
        <ProfileInfo>
          <ProfileImage src="/images/kim.PNG" alt="프로필 사진" />
          <ProfileText>
            <ProfileName>김용현</ProfileName>
            <ProfileEmail>kim.yh@example.com</ProfileEmail>
            <ProfileDate>가입일: 2023년 8월</ProfileDate>
          </ProfileText>
        </ProfileInfo>
        <EditProfileButton>프로필 수정</EditProfileButton>
      </MyPageProfile>

      {/* 유언장 통계 */}
      <MyPageStats>
        {[
          { label: '작성 중인 유언장', value: 2 },
          { label: '공증 진행 중', value: 1 },
          { label: '공증 완료', value: 3 },
          { label: '지정 열람자', value: 5 },
        ].map((item, i) => (
          <StatCard key={i}>
            <StatValue>{item.value}</StatValue>
            <StatLabel>{item.label}</StatLabel>
          </StatCard>
        ))}
      </MyPageStats>

      {/* 빠른 작업 */}
      <MyPageActions>
        <ActionButton>
          <FaFileSignature size={24} />
          <span>새 유언장 작성</span>
        </ActionButton>
        <ActionButton>
          <FaUserFriends size={24} />
          <span>열람자 관리</span>
        </ActionButton>
        <ActionButton>
          <FaShieldAlt size={24} />
          <span>보안 설정</span>
        </ActionButton>
      </MyPageActions>

      {/* 최근 활동 + 설정 */}
      <MyPageColumns>
        <MyPageRecent>
          <h4>최근 활동</h4>
          <ul>
            {[
              { text: '주 유언장 내용 수정', date: '2023.11.15' },
              { text: '새로운 열람자 추가: 김미란', date: '2023.11.13' },
              { text: '유언장 공증 완료', date: '2023.11.10' },
              { text: '2단계 인증 활성화', date: '2023.11.08' },
            ].map((item, i) => (
              <li key={i}>
                <ActivityItem>
                  <FaHistory className="icon" />
                  {item.text}
                </ActivityItem>
                <span className="date">{item.date}</span>
              </li>
            ))}
          </ul>
        </MyPageRecent>

        <MyPageSide>
          {/* 보안 설정 */}
          <Box>
            <h4>보안 설정</h4>
            <SettingsList>
              {[
                { label: '2단계 인증', icon: <FaUserShield /> },
                { label: '알림 설정', icon: <FaBell /> },
                { label: '계정 설정', icon: <FaCog /> },
              ].map((item, i) => (
                <li key={i}>
                  <SettingsItem>
                    <div className="icon">{item.icon}</div>
                    <span>{item.label}</span>
                    <FaAngleRight className="arrow" />
                  </SettingsItem>
                </li>
              ))}
            </SettingsList>
          </Box>

          {/* 연동 서비스 */}
          <Box>
            <h4>연동 서비스</h4>
            <LinkedServicesText>
              공증 서비스 <span className="active">연동됨</span>
            </LinkedServicesText>
            <LinkedServicesText>
              블록체인 지갑 <span className="active">연동됨</span>
            </LinkedServicesText>
          </Box>

          {/* 로그아웃 */}
          <LogoutButton>
            <FaSignOutAlt className="icon" />
            로그아웃
          </LogoutButton>
        </MyPageSide>
      </MyPageColumns>
    </MyPageContainer>
  );
};

export default MyPage;
