// 유언장 미리보기
import styled from 'styled-components';

export const WillPreviewSection = styled.section`
  background: #ffffff;
  padding: 20px 20px; 
`;

/* 제목 및 설명 */
export const PreviewHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

export const PreviewTitle = styled.h2`
  font-size: 26px; 
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

export const PreviewSub = styled.p`
  font-size: 15px; 
  color: #6b7280;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

/* 본문 구성 */
export const PreviewContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 1100px; 
  margin: 0 auto;
  gap: 40px; 
  flex-wrap: wrap;
  text-align: left;
`;

/* 왼쪽 카드 */
export const PreviewLeft = styled.div`
  flex: 1;
  min-width: 320px; 
  display: flex;
  justify-content: center;
`;

export const PreviewCard = styled.div`
  background: #ffffff;
  border-radius: 12px; 
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 20px; 
  max-width: 700px;
  width: 100%;
`;

export const PreviewCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-bottom: 12px;
`;

export const StatusTag = styled.span`
  background-color: #ecfdf5;
  color: #059669;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const PreviewDate = styled.span`
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
`;

export const PreviewCardTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
`;

export const PreviewCardBody = styled.div`
  background-color: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 10px;
  height: 100px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #9ca3af;
  font-size: 13px;
  gap: 6px;
  margin-bottom: 12px;
`;

export const PreviewCardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const PreviewTag = styled.div`
  background-color: #eef2ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: #4b5563;
`;

export const TagLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
`;

export const TagValue = styled.span`
  font-weight: 700;
  color: ${props => (props.verified ? '#10b981' : '#4b5563')};
`;

/* 오른쪽 설명 */
export const PreviewRight = styled.div`
  flex: 1;
  min-width: 280px; 
  display: flex;
  flex-direction: column;
  gap: 20px; 
`;

export const PreviewInfoBlock = styled.div`
  h4 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #111827;
  }

  p {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.6;
  }
`;
