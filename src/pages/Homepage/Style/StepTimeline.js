// 서비스 작동 원리
import styled from 'styled-components';

export const StepContainer = styled.section`
  background: #ffffff;
  padding: 70px 20px;
  text-align: center;
`;

export const StepTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
`;

export const StepDesc = styled.p`
  margin-top: 12px;
  color: #6b7280;
  font-size: 16px;
  line-height: 1.6;
`;

export const StepTimeline = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  margin-top: 56px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    &::before {
      display: none;
    }
  }
`;

export const StepItem = styled.div`
  background: white;
  z-index: 1;
  flex: 1;
  max-width: 180px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const IconCircle = styled.div`
  width: 60px;
  height: 60px;
  background: #eef2ff;
  color: #6366f1;
  border-radius: 50%;
  margin: 0 auto 16px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

export const StepLabel = styled.div`
  font-weight: 700;
  font-size: 15px;
  margin: 4px 0 8px;
`;

export const StepText = styled.p`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
`;

export const Connector = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -16px;
  color: #ccc;
  font-size: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;
