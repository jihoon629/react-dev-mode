// 당신의 마지막 뜻, 안전하게 남기는 가장 현대적인 방법.
import styled, { keyframes } from 'styled-components';

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HeroSection = styled.section`
  display: flex;
  background-color: #f9fafa;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 70px 40px 100px;
  max-width: 1280px;
  margin: 0 auto;
  gap: 40px;
`;

export const HeroText = styled.div`
  flex: 1;
  min-width: 320px;
`;

export const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: 800;
  line-height: 1.4;
  color: #1f2937;

  .line1 {
    display: block;
    animation: ${slideInLeft} 1.2s ease forwards;
  }

  .line2 {
    display: block;
    opacity: 0;
    animation: ${slideInLeft} 1.2s ease forwards;
    animation-delay: 1.3s;
  }

  span {
    color: #6366f1;
  }
`;

export const HeroDesc = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #6b7280;
  line-height: 1.8;

  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 2.8s;
`;

export const ButtonGroup = styled.div`
  margin-top: 36px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 2.8s;
`;

export const PrimaryButton = styled.button`
  background: #6366f1;
  color: #ffffff;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.3);
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #4f46e5;
    transform: translateY(-2px);
  }
`;

export const SecondaryButton = styled.button`
  background: #ffffff;
  color: #6366f1;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border: 2px solid #6366f1;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #eef2ff;
    transform: translateY(-2px);
  }
`;

export const HeroCard = styled.div`
  flex: 0.9;
  min-width: 300px;
  max-width: 400px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  padding: 28px;
  transition: box-shadow 0.3s, transform 0.2s;

  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 2.8s;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
`;

export const CardHeader = styled.div`
  font-size: 13px;
  color: #6366f1;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1f2937;
`;

export const CardBox = styled.div`
  background: #eef2ff;
  border-radius: 10px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const CardFooter = styled.div`
  font-size: 13px;
  color: #6b7280;
  display: flex;
  justify-content: space-between;
`;
