import MomentumSlider from "./MomentumSlider";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import "./style.css";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  position: relative;
  flex: 1 1 auto;
  border-bottom: 1px solid #ddd;
`;

const Slider = ({ name, initialValue, onChange, min, max }) => {
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
          transform: [{scale: [0.4, 1]}],
          opacity: [0.3, 1],
        }
      });
      setSlider(true);
    }
  }, [container])

  return (<Container ref={container} className={sliderClass} />);
};

export default Slider;
