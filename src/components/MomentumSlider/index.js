import MomentumSlider from "./MomentumSlider";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import "./style.css";

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  flex: 1 1 auto;
  border-bottom: 1px solid #444;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  flex: 1 1 auto;
`;

const ToolTip = styled.div`
  opacity: 0.3;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  color: #888;
  display: flex;
  align-items: center;
  font-size: 112px;
  justify-content: center;
  font-family: "Delerium NCV";
  text-transform: uppercase;
`;

const Slider = ({ name, initialValue, onChange, min, max, tipColor = "#fff" }) => {
  const sliderClass = `slider-${name}`;
  const container = useRef(null);
  const [slider, setSlider] = useState(false);

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
      <ToolTip tipColor={tipColor}>{name} </ToolTip>
      <Container ref={container} className={sliderClass} />
    </OuterContainer>
  );
};

export default Slider;
