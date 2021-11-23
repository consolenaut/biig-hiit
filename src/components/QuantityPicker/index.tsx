// step
// rep
// work
// rest
// break
// GO!
import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { callbackify } from 'util';
// import { QuantityPicker } from 'react-qty-picker';

const Button = styled.div`
  width: 80%;
  height: 100%;
//   border-radius: 50px;
  background: #ccc;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #1A1A1A;
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Quantity = styled.h1`
    width: 100%;
    text-align: center;
    font-size: 72px;
    line-height: 72px;
    color: #fff;
    font-family: "Delerium NCV";
`;

interface QuantityPickerProps {
  onChange?: Function,
  value: number,
  min?: number,
  max?: number,
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({ onChange = () => {}, value, min, max, }) => {
  const incrementCount = () => {
    if (!max) return onChange(value + 1);
    if (max && (value + 1) <= max ) return onChange(value + 1);
  }
  const decrementCount = () => {
    if (!min) return onChange(value - 1);
    if (min && (value - 1) >= min ) return onChange(value - 1);
  }

  return (
    <Container>
        <Button onClick={decrementCount}>-</Button>
        <Quantity>{value}</Quantity>
        <Button onClick={incrementCount}>+</Button>
    </Container>
  )
}

export default QuantityPicker;
