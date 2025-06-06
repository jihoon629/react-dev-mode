import React from "react";
import {
  Container,
  ProfileSection,
  ProfileImage,
  ProfileInfo,
  CreateButton,
  DocumentList,
  DocumentItem,
  LeftSection,
  CenterSection,
  RightSection,
  DocumentTitle,
  InfoRow,
  HashText,
  Label,
  DocumentInfo,
  ActionButtons,
  EditButton,
  DeleteButton,
} from "./style/WillListPageStyle";
import { FaCopy, FaEdit, FaTrashAlt, FaFileAlt } from "react-icons/fa";

const WillListPage = () => {
  const exampleWills = [
    {
      id: 1,
      title: "김용현의 유언장",
      hash: "0x123456789abcdef",
      blockchainRegistered: true,
      notarized: true,
      viewers: "공영선, 류금태, 나수석",
    },
    {
      id: 2,
      title: "테스트 유언장",
      hash: "0xabcdef123456789",
      blockchainRegistered: true,
      notarized: false,
      viewers: "김용현, 김경기",
    },
    {
      id: 3,
      title: "예비 유언장",
      hash: "0x987654321fedcba",
      blockchainRegistered: false,
      notarized: false,
      viewers: "김현섭",
    },
    {
      id: 4,
      title: "샘플 유언장",
      hash: "0xdeadbeefcafebabe",
      blockchainRegistered: true,
      notarized: true,
      viewers: "이수진, 박지윤, 김민수",
    },
  ];

  return (
    <Container>
      <ProfileSection>
        <ProfileImage src="/images/back.PNG" alt="프로필" />
        <ProfileInfo>
          <h2>김용현</h2>
          <p>가입일: 2023년 8월</p>
          <p>kim.yh@example.com</p>
        </ProfileInfo>
        <CreateButton>유언장 작성 시작하기</CreateButton>
      </ProfileSection>

      <DocumentList>
        {exampleWills.map((will) => (
          <DocumentItem key={will.id}>
            <LeftSection>
              <FaFileAlt size={50} color="#6366f1" />
            </LeftSection>

            <CenterSection>
              <DocumentTitle>{will.title}</DocumentTitle>

              <InfoRow>
                <HashText>{will.hash}</HashText>
                <FaCopy size={16} color="#6b7280" style={{ cursor: "pointer" }} />
                {will.blockchainRegistered && (
                  <Label $blockchain>블록체인 등록됨</Label>
                )}
                {will.notarized && <Label $notarized>공증 완료</Label>}
              </InfoRow>

              <DocumentInfo>열람자: {will.viewers}</DocumentInfo>
            </CenterSection>

            <RightSection>
              <ActionButtons>
                <EditButton>
                  <FaEdit size={16} style={{ marginRight: "6px" }} />
                  수정하기
                </EditButton>
                <DeleteButton>
                  <FaTrashAlt size={16} style={{ marginRight: "6px" }} />
                  삭제하기
                </DeleteButton>
              </ActionButtons>
            </RightSection>
          </DocumentItem>
        ))}
      </DocumentList>
    </Container>
  );
};

export default WillListPage;
