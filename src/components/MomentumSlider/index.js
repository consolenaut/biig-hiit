import MomentumSlider from "./MomentumSlider";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

import "./style.css";

const fadeOut = keyframes`
  0% {opacity: 1;}
  60% {opacity: 1;}
  100% {opacity: 0;} 
`;

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  flex: 1 1 auto;
  border-bottom: 1px solid #444;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  position: relative;
  flex: 1 1 auto;
`;

const ToolTip = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: ${({ tipColor }) => tipColor};
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 72px;
  justify-content: center;
  font-family: "Delerium NCV";
  text-transform: uppercase;

  animation: ${fadeOut} 6s normal forwards linear;
`;

const Slider = ({ name, initialValue, onChange, min, max, tipColor = "#fff" }) => {
  const sliderClass = `slider-${name}`;
  const container = useRef(null);
  const [slider, setSlider] = useState(false);
  const [showTip, setShowTip] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowTip(false);
    }, 7000)
  }, [])

  useEffect(() => {
    if (container && !slider) {
      new MomentumSlider({
        el: container.current,
        range: [min, max],
        currentIndex: initialValue - min,
        change: (newIndex, oldIndex) => {
          if (oldIndex !== undefined) onChange(newIndex + min);
        },
        style: {
          transform: [{scale: [0.5, 1]}],
          opacity: [0.3, 1],
        }
      });
      setSlider(true);
    }
  }, [container])

  return (
    <OuterContainer>
      <Container ref={container} className={sliderClass} />
      { showTip && <ToolTip tipColor={tipColor}>{name}</ToolTip> }
    </OuterContainer>
  );
};

export default Slider;
