import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import useSound from 'use-sound';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

import Slider from '../MomentumSlider';

import clickSound from './sounds/click.m4a';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #1A1A1A;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const NotchSpacer = styled.div`
  width: 100%;
  height: 182px;
  display: block;
`;

const StartButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: 4.5rem;
  line-height: 4.5rem;
  color: #fff;
  font-family: "Delerium NCV";
`;

interface StartProps {
  states: any,
  setStates: Function,
}

const hapticsImpact = async hapticType => {
  await Haptics.impact({ style: hapticType });
  playClick(); 
};

const Start: React.FC<StartProps> = ({ states, setStates }) => {
  const history = useHistory();
  const [playClick] = useSound(clickSound);

  const handleChange = (value: number, field: string) => {
    hapticsImpact(ImpactStyle.Light); 
    setStates({ [field]: value });
  }

  const handleClick = () => {
    hapticsImpact(ImpactStyle.Medium);
    history.push("/running")
  }
  
  const StyledSlider = (name, tipColor, max) => <Slider name initialValue={states[name]} onChange={(value: number) => handleChange(value, name)} min={1} max tipColor />

  return (
    <Container>
      <NotchSpacer />
      
      <StyledSlider name='work' tipColor='#B47759' max={99} />
      <StyledSlider name='rest' tipColor='#B4904C' max={999} />
      <StyledSlider name='steps' tipColor='#889C6D' max={99} />
      <StyledSlider name='reps' tipColor='#669B86' max={99} />
      <StyledSlider name='break' tipColor='#508394' max={999} />
      <StartButton onClick={() => handleClick()}>GO</StartButton>
    </Container>
  );
};

export default Start;
