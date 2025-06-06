// 사용자 이야기
import styled from 'styled-components';

export const TestimonialSection = styled.section`
  background: #ffffff;
  padding: 80px 20px;
  text-align: center;
`;

export const TestimonialHeader = styled.div`
  margin-bottom: 40px;
`;

export const TestimonialTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
`;

export const TestimonialSub = styled.p`
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
`;

/* 그리드 */
export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
`;

/* 카드 */
export const TestimonialCard = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
`;

/* 사용자 정보 */
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const UserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
`;

export const UserJob = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

/* 사용자 인용문 */
export const UserQuote = styled.p`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
`;
