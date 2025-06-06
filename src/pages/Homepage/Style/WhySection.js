// 왜 마침표인가?
import styled from 'styled-components';

export const WhySection = styled.section`
  background-color: #ffffff;
  padding: 100px 20px;
  text-align: center;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px; /* 카드 간 간격을 여유롭게 */
  max-width: 960px;
  margin: 40px auto 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: #f9fafb; /* 은은한 연회색 배경 */
  border-radius: 12px;
  padding:8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }

  h4 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #1f2937;
  }

  p {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.5;
  }
`;

export const FeatureIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
`;
