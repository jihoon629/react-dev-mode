import React, { useEffect, useState } from "react";
import {
  MyPageContainer,
  MyPageProfile,
  ProfileInfo,
  ProfileImage,
  ProfileText,
  ProfileName,
  ProfileEmail,
  ProfileDate,
  EditProfileButton,
  MyPageStats,
  StatCard,
  StatValue,
  StatLabel,
  MyPageActions,
  ActionButton,
  MyPageColumns,
  MyPageRecent,
  MyPageSide,
  Box,
  SettingsList,
  SettingsItem,
  LinkedServicesText,
  LogoutButton,
  ActivityItem,
} from "./style/MyPageStyle";
import { useSelector } from "react-redux";
import willService from "../../services/willService";
import {
  FaFileSignature,
  FaUserFriends,
  FaShieldAlt,
  FaUserShield,
  FaBell,
  FaCog,
  FaAngleRight,
  FaLink,
  FaSignOutAlt,
  FaHistory,
} from "react-icons/fa";

const MyPage = () => {
  const { username } = useSelector((state) => state.user);

  const [viewerWills, setViewerWills] = useState([]);
  const [profile, setProfile] = useState({
    name: "이름 없음",
    email: "이메일 정보 없음",
    phone: "전화번호 정보 없음",
    birthDate: "생년월일 정보 없음",
    joinDate: "가입일 정보 없음",
  });
  const [statusCounts, setStatusCounts] = useState({
    REGISTERED: 0,
    ACTIVE: 0,
    EXECUTED: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("📛 현재 로그인된 사용자 username:", username);

    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileData, countsData] = await Promise.all([
          willService.getUserProfile(username),
          willService.getWillStatusCounts(username),
        ]);

        if (profileData) {
          console.log("🙋‍♀️ 사용자 프로필 응답:", profileData);
          setProfile({
            name: profileData.name || "이름 없음",
            email: "이메일 정보 없음",
            phone: profileData.phone || "전화번호 정보 없음",
            birthDate: profileData.birth
              ? profileData.birth.slice(0, 10)
              : "생년월일 정보 없음",
            joinDate: "가입일 정보 없음",
          });
        } else {
          setProfile({
            name: "이름 없음",
            email: "이메일 정보 없음",
            phone: "전화번호 정보 없음",
            birthDate: "생년월일 정보 없음",
            joinDate: "가입일 정보 없음",
          });
        }

        console.log("📊 유언장 상태별 개수 응답:", countsData);
        setStatusCounts(countsData || { REGISTERED: 0, ACTIVE: 0, EXECUTED: 0 });
      } catch (error) {
        console.error("❌ 마이페이지 데이터 로딩 실패:", error);
        setProfile({
          name: "이름 없음",
          email: "이메일 정보 없음",
          phone: "전화번호 정보 없음",
          birthDate: "생년월일 정보 없음",
          joinDate: "가입일 정보 없음",
        });
        setStatusCounts({ REGISTERED: 0, ACTIVE: 0, EXECUTED: 0 });
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    } else {
      console.warn("⚠️ username이 없어서 API 요청을 생략합니다.");
      setLoading(false);
      setProfile({
        name: "이름 없음",
        email: "이메일 정보 없음",
        phone: "전화번호 정보 없음",
        birthDate: "생년월일 정보 없음",
        joinDate: "가입일 정보 없음",
      });
      setStatusCounts({ REGISTERED: 0, ACTIVE: 0, EXECUTED: 0 });
    }
  }, [username]);

  if (loading) return <div>⏳ 마이페이지 로딩 중...</div>;

  const willStats = [
    { label: "작성 중인 유언장", value: statusCounts.REGISTERED || 0 },
    { label: "공증 진행 중", value: statusCounts.ACTIVE || 0 },
    { label: "공증 완료", value: statusCounts.EXECUTED || 0 },
  ];

  return (
    <MyPageContainer>
      <MyPageProfile>
        <ProfileInfo>
          <ProfileImage src="/images/kim.PNG" alt="프로필 사진" />
          <ProfileText>
            <ProfileName>{profile.name}</ProfileName>
            <ProfileEmail>이메일: {profile.email}</ProfileEmail>
            <ProfileEmail>전화번호: {profile.phone}</ProfileEmail>
            <ProfileEmail>생년월일: {profile.birthDate}</ProfileEmail>
            <ProfileDate>가입일: {profile.joinDate}</ProfileDate>
          </ProfileText>
        </ProfileInfo>
        <EditProfileButton>프로필 수정</EditProfileButton>
      </MyPageProfile>

      <MyPageStats>
        {willStats.map((stat, idx) => (
          <StatCard key={idx}>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
        <StatCard>
          <StatValue>{viewerWills.length}</StatValue>
          <StatLabel>지정 열람자</StatLabel>
        </StatCard>
      </MyPageStats>

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

      <MyPageColumns>
        <MyPageRecent>
          <h4>최근 활동</h4>
          <ul>
            {[
              { text: "주 유언장 내용 수정", date: "2023.11.15" },
              { text: "새로운 열람자 추가: 김미란", date: "2023.11.13" },
              { text: "유언장 공증 완료", date: "2023.11.11" },
              { text: "2단계 인증 활성화", date: "2023.11.09" },
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
          <Box>
            <h4>보안 설정</h4>
            <SettingsList>
              {[
                { label: "2단계 인증", icon: <FaUserShield /> },
                { label: "알림 설정", icon: <FaBell /> },
                { label: "계정 설정", icon: <FaCog /> },
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

          <Box>
            <h4>연동 서비스</h4>
            <LinkedServicesText>
              공증 서비스 <span className="active">연동됨</span>
            </LinkedServicesText>
            <LinkedServicesText>
              블록체인 지갑 <span className="active">연동됨</span>
            </LinkedServicesText>
          </Box>

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
