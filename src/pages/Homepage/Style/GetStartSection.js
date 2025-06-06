// 시작하기
import styled from 'styled-components';

export const GetStartSection = styled.section`
  background: #f9fafb; /* 부드러운 회색톤 배경 */
  padding: 60px 20px;
`;

export const GetStartTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  color: #1f2937;
`;

export const GetStartSub = styled.p`
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 40px;
`;

export const GetStartGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
  flex-wrap: wrap;
`;

export const GuideBlock = styled.div`
  flex: 1;
  min-width: 260px;
`;

export const GuideTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #111827;
`;

export const GuideItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
`;

export const GuideItemIcon = styled.div`
  font-size: 18px;
  line-height: 1;
  margin-top: 2px;
`;

export const GuideText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GuideTextTitle = styled.strong`
  font-size: 14px;
  font-weight: 700;
  color: #111827;
`;

export const GuideTextSub = styled.p`
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
`;

export const GuideIcon = styled.img`
  width: 28px;
  height: 28px;
`;

export const CtaBox = styled.div`
  background: linear-gradient(to right, #6366f1, #818cf8);
  padding: 16px;
  border-radius: 12px;
  margin-top: 24px;
  color: white;

  h4 {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  p {
    font-size: 12px;
    margin-bottom: 8px;
  }
`;

export const CtaButton = styled.button`
  background: white;
  color: #4f46e5;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  border: none;
  cursor: pointer;
`;

export const FaqBlock = styled.div`
  flex: 1;
  min-width: 260px;
`;

export const FaqTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #111827;
`;

export const FaqQuestion = styled.div`
  margin-bottom: 10px;
`;

export const FaqQuestionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
`;

export const FaqQuestionText = styled.div`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
`;

export const SectionDivider = styled.hr`
  border: none;
  height: 1.5px;
  background-color: #d1d5db;
  margin: 24px 0;
`;

export const InquiryBox = styled.div`
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 24px;
  margin-top: 24px;
`;

export const InquiryText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InquiryTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const InquirySub = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

export const InquiryButton = styled.button`
  background-color: #6366f1;
  color: white;
  font-size: 13px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #4f46e5;
  }
`;

export const LegalFooterNote = styled.div`
  background-color: #f1f4ff;
  text-align: center;
  padding: 16px;
  margin-top: 40px;
  font-size: 13px;
  color: #6b7280;
  border-radius: 8px;
`;
