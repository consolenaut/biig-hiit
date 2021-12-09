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

  // border-top: 1px solid #ddd;

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

const hapticsImpactLight = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};

const hapticsImpactMedium = async () => {
  await Haptics.impact({ style: ImpactStyle.Medium });
};

const Start: React.FC<StartProps> = ({ states, setStates }) => {
  const history = useHistory();
  const [playClick] = useSound(clickSound);

  const handleChange = (value: number, field: string) => {
    hapticsImpactLight(); 
    playClick(); 
    setStates({ [field]: value });
  }

  const handleClick = () => {
    hapticsImpactMedium(); 
    playClick(); 
    history.push("/running")
  }

  return (
    <Container>
      <NotchSpacer />

      <Slider name="work" initialValue={states.work} onChange={(value: number) => handleChange(value, 'work')} min={1} max={999} tipColor='#B47759' />
      <Slider name="rest" initialValue={states.rest} onChange={(value: number) => handleChange(value, 'rest')} min={1} max={999} tipColor='#B4904C' />
      <Slider name="rounds" initialValue={states.steps} onChange={(value: number) => handleChange(value, 'steps')} min={1} max={99} tipColor='#889C6D' />
      <Slider name="repeat" initialValue={states.reps} onChange={(value: number) => handleChange(value, 'reps')} min={1} max={99} tipColor='#669B86' />
      <Slider name="break" initialValue={states.break} onChange={(value: number) => handleChange(value, 'break')} min={1} max={999} tipColor='#508394' />
      <StartButton onClick={() => handleClick()}>GO</StartButton>
    </Container>
  );
};

export default Start;
