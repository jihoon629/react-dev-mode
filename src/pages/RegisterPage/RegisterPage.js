import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  PageWrapper,
  Content,
  Title,
  Subtitle,
  SectionWrapper,
  SectionHeader,
  SectionContent,
  Row,
  Label,
  Input,
  Select,
  Button,
  SubmitButton,
  AddressRow,
  PhoneRow,
  MobileRow,
} from "./style/RegisterPageStyle";
import { registerUser } from "../../features/user/userSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [memberType, setMemberType] = useState("personal");
  const [gender, setGender] = useState("male");

  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
    email: "",
    phone: "",
    birth: "",
    address: "",
    gender: "male",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    dispatch(registerUser(form));
  };

  return (
    <PageWrapper>
      <Content as="form" onSubmit={handleSubmit}>
        <Title>가입을 시작합니다.</Title>
        <Subtitle>마침표에 오신것을 환영합니다.</Subtitle>

        <SectionWrapper>
          <SectionHeader>
            <span>회원인증</span>
          </SectionHeader>
          <SectionContent>
            <Row>
              <Label as="span">회원 유형</Label>
              <label>
                <input
                  type="radio"
                  name="memberType"
                  value="personal"
                  checked={memberType === "personal"}
                  onChange={() => setMemberType("personal")}
                />{" "}
                개인회원
              </label>
            </Row>
          </SectionContent>
        </SectionWrapper>

        <SectionWrapper>
          <SectionHeader>
            <span>기본정보</span>
            <span style={{ color: "#e74c3c", fontSize: "12px" }}>필수</span>
          </SectionHeader>
          <SectionContent>
            <Row>
              <Label className="required">아이디</Label>
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="아이디 입력"
                required
              />
            </Row>
            <Row>
              <Label className="required">비밀번호</Label>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호 입력"
                required
              />
            </Row>
            <Row>
              <Label className="required">비밀번호 확인</Label>
              <Input
                name="passwordConfirm"
                type="password"
                value={form.passwordConfirm}
                onChange={handleChange}
                placeholder="비밀번호 재입력"
                required
              />
            </Row>
            <Row>
              <Label className="required">이름</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="이름 입력"
                required
              />
            </Row>
            <Row>
              <Label>이메일</Label>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@domain.com"
              />
            </Row>
            <Row>
              <Label>휴대전화</Label>
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="010-1234-5678"
              />
            </Row>
            <Row>
              <Label>주소</Label>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="서울시 강남구"
              />
            </Row>
          </SectionContent>
        </SectionWrapper>

        <SectionWrapper>
          <SectionHeader>
            <span>추가정보</span>
          </SectionHeader>
          <SectionContent>
            <Row style={{ flexWrap: "nowrap" }}>
              <Label className="required">성별</Label>
              <div style={{ display: "flex", gap: "16px" }}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => {
                      setGender("male");
                      setForm({ ...form, gender: "male" });
                    }}
                  />{" "}
                  남자
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => {
                      setGender("female");
                      setForm({ ...form, gender: "female" });
                    }}
                  />{" "}
                  여자
                </label>
              </div>
            </Row>
            <Row>
              <Label className="required">생년월일</Label>
              <Input
                name="birth"
                value={form.birth}
                onChange={handleChange}
                placeholder="YYYY-MM-DD"
                style={{ maxWidth: "150px" }}
              />
            </Row>
          </SectionContent>
        </SectionWrapper>

        <SubmitButton type="submit">가입하기</SubmitButton>
      </Content>
    </PageWrapper>
  );
};

export default RegisterPage;
