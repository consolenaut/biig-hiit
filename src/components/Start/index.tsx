import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import useSound from 'use-sound';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

import QuantityPicker from '../QuantityPicker';

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
  font-size: 72px;
  line-height: 72px;
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

  return (
    <Container>
      <QuantityPicker value={states.steps} onChange={(value: number) => { hapticsImpactLight(); playClick(); setStates({ steps: value }); }} min={1} max={99} />
      <QuantityPicker value={states.reps} onChange={(value: number) => { hapticsImpactLight(); playClick(); setStates({ reps: value }); }} min={1} max={99} />
      <QuantityPicker value={states.work} onChange={(value: number) => { hapticsImpactLight(); playClick(); setStates({ work: value }); }} min={1} max={999} />
      <QuantityPicker value={states.rest} onChange={(value: number) => { hapticsImpactLight(); playClick(); setStates({ rest: value }); }} min={1} max={999} />
      <QuantityPicker value={states.break} onChange={(value: number) => { hapticsImpactLight(); playClick(); setStates({ break: value }); }} min={1} max={999} />
      <StartButton onClick={() => { hapticsImpactMedium(); playClick(); history.push("/running")}}>GO</StartButton>
    </Container>
  );
};

export default Start;