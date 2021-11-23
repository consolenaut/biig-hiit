import styled from 'styled-components';

const Button = styled.div<{ left?: boolean }>`
  width: 80%;
  height: 100%;
 
  font-size: 100px;
  line-height: 100px;
  color: #fff;
  font-family: "Delerium NCV";
  text-align: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  // border-bottom: 1px solid #ddd;
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
        <Button left onClick={decrementCount}>-</Button>
        <Quantity>{value}</Quantity>
        <Button onClick={incrementCount}>+</Button>
    </Container>
  )
}

export default QuantityPicker;
