import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "../../features/common/uiSlice";

const Container = styled.div`
  max-width: 850px;
  margin: 60px auto 40px;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
`;

const FormWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 40px 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const StepIndicator = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #574bff;
  margin-bottom: 12px;
  user-select: none;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  height: 120px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.button`
  background-color: ${({ selected }) => (selected ? "#574bff" : "#f1f3f5")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s, color 0.3s;
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  background: #fff;
`;

const SubmitButton = styled.button`
  background-color: #48e0c7;
  color: #fff;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #2ccab4;
  }
`;

const NOTARY_TAG_OPTIONS = [
  "유언공증",
  "부동산공증",
  "계약서공증",
  "출생공증",
  "혼인공증",
  "이혼공증",
  "상속공증",
  "위임장",
  "사서증서",
  "번역공증",
  "공증경력10년↑",
];

const NotaryServiceCreatePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [form, setForm] = useState({
    companyName: user?.company || "",
    contact: "",
    description: "",
    tags: [],
    servicePhone: user?.phone || "",
    servicePrice: "",
    visitServicePrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagClick = (tag) => {
    setForm((prev) => {
      const isSelected = prev.tags.includes(tag);
      let newTags;
      if (isSelected) {
        newTags = prev.tags.filter((t) => t !== tag);
      } else {
        if (prev.tags.length < 3) {
          newTags = [...prev.tags, tag];
        } else {
          newTags = prev.tags;
        }
      }
      return { ...prev, tags: newTags };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("공증 서비스 등록 정보:", form);
    dispatch(
      showToastMessage({
        message: "공증 서비스가 등록되었습니다.",
        status: "success",
      })
    );
    // 실제 API 연동 로직 위치 (visitServicePrice도 form에 포함됨)
  };

  return (
    <Container>
      <Title>공증 서비스 등록</Title>
      <FormWrapper as="form" onSubmit={handleSubmit}>
        <GridContainer>
          <FormGroup>
            <Label htmlFor="companyName">회사명</Label>
            <Input
              id="companyName"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contact">회사 전화번호</Label>
            <Input
              id="contact"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="servicePhone">상담 전화번호</Label>
            <Input
              id="servicePhone"
              name="servicePhone"
              value={form.servicePhone}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="servicePrice">전화 상담 가격</Label>
            <Select
              id="servicePrice"
              name="servicePrice"
              value={form.servicePrice}
              onChange={handleChange}
            >
              <option value="">가격 선택</option>
              {[10000, 15000, 20000, 25000, 30000].map((price) => (
                <option key={price} value={price}>
                  {price.toLocaleString()}원
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="visitServicePrice">방문 상담 가격</Label>
            <Select
              id="visitServicePrice"
              name="visitServicePrice"
              value={form.visitServicePrice || ""}
              onChange={handleChange}
            >
              <option value="">가격 선택</option>
              {[50000, 55000, 60000, 65000, 70000, 75000, 80000].map(
                (price) => (
                  <option key={price} value={price}>
                    {price.toLocaleString()}원
                  </option>
                )
              )}
            </Select>
          </FormGroup>
        </GridContainer>

        <FormGroup>
          <Label>태그 (최대 3개 선택 가능)</Label>
          <TagContainer>
            {NOTARY_TAG_OPTIONS.map((tag) => (
              <Tag
                type="button"
                key={tag}
                selected={form.tags.includes(tag)}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Tag>
            ))}
          </TagContainer>
        </FormGroup>

        <FormGroup>
          <Label>상세 소개</Label>
          <TextArea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </FormGroup>

        <SubmitButton type="submit">서비스 등록하기</SubmitButton>
      </FormWrapper>
    </Container>
  );
};

export default NotaryServiceCreatePage;
