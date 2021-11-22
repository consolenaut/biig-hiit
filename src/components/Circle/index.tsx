import styled, { keyframes, css } from 'styled-components';

const rumble = keyframes`
  0% {-webkit-transform: rotate(0deg) scale(1);}
  25% {-webkit-transform: translate(2px, 0px) rotate(-3deg) scale(1.03);}
  50% {-webkit-transform: translate(0px, -2px) rotate(0deg) scale(0.97);}
  75% {-webkit-transform: translate(-2px, 0px) rotate(3deg) scale(1.03);}
  100% {-webkit-transform: translate(0px, 2px) rotate(0deg) scale(0.97);} 
`;

const CircleBody = styled.div<{ circleSize: number, circleColor: string }>`
  width: ${({ circleSize }) => `${circleSize}px` };
  height: ${({ circleSize }) => `${circleSize}px` };
  border-radius: ${({ circleSize }) => `${circleSize/2}px` };
  text-align: center;
  transition: all .4s ease;
  background: ${({ circleColor }) => {
    if (circleColor === 'orange') return '#FF6700';
    if (circleColor === 'blue') return '#29ABE2';
    return 'none';
  }};
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: ${({ circleSize }) => `-${circleSize/2}px` };
  margin-top: ${({ circleSize }) => `-${circleSize/2}px` };
`;

const Timer = styled.h1<{ shouldRumble?: boolean, paused? : boolean }>`
  font-size: 200px;
  line-height: 200px;
  position: absolute;
  text-align: center;
  width: 100%;
  top: 50%;
  margin-top: -100px;
  left: 0;
  right: 0;
  color: ${({ paused }) => paused ? '#666' : '#fff' };
  font-family: "Delerium NCV";
  animation: ${({ shouldRumble }) => shouldRumble ? css`${rumble} .1s infinite linear` : 'none' };
`;

interface CircleProps {
  circleColor: string;
  circleSize: number;
  shouldRumble?: boolean;
  paused?: boolean;
}

const Circle: React.FC<CircleProps> = ({ circleSize, circleColor, shouldRumble, paused, children }) => {
  return (
    <>
      <CircleBody circleSize={circleSize} circleColor={paused ? 'none' : circleColor}></CircleBody>
      <Timer paused={paused} shouldRumble={paused ? false : shouldRumble}>{children}</Timer>
    </>
  );
};

export default Circle;
  