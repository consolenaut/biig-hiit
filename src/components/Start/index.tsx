// step
// rep
// work
// rest
// break
// GO!
import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import useSound from 'use-sound';

import QuantityPicker from '../QuantityPicker';

import clickSound from './sounds/click.m4a';
import goSound from './sounds/go.m4a';

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
  background: #aaa;
`;

interface StartProps {
  steps: number;
  setSteps: Function;
  reps: number;
  setReps: Function;
  work: number;
  setWork: Function;
  rest: number;
  setRest: Function;
  breakk: number;
  setBreakk: Function;
}

const Start: React.FC<StartProps> = ({
  steps,
  setSteps, 
  reps, 
  setReps, 
  work, 
  setWork, 
  rest, 
  setRest, 
  breakk, 
  setBreakk,
}) => {
  const history = useHistory();
  const [playClick] = useSound(clickSound);
  const [playGo] = useSound(goSound);

  return (
    <Container>
      <QuantityPicker value={steps} onChange={(value: number) => { playClick(); setSteps(value); }} min={1} max={99} />
      <QuantityPicker value={reps} onChange={(value: number) => { playClick(); setReps(value); }} min={1} max={99} />
      <QuantityPicker value={work} onChange={(value: number) => { playClick(); setWork(value); }} min={1} max={999} />
      <QuantityPicker value={rest} onChange={(value: number) => { playClick(); setRest(value); }} min={1} max={999} />
      <QuantityPicker value={breakk} onChange={(value: number) => { playClick(); setBreakk(value); }} min={1} max={999} />
      <StartButton onClick={() => { playGo(); history.push("/running")}} />
      {/* <QuantityPicker min={1} max={99} value={steps} onChange={setSteps} />
      <QuantityPicker min={1} max={99} value={reps} onChange={setReps} />
      <QuantityPicker min={1} max={999} value={work} onChange={setWork} />
      <QuantityPicker min={1} max={999} value={rest} onChange={setRest} />
      <QuantityPicker min={1} max={999} value={breakk} onChange={setBreakk} /> */}
    </Container>
  );
};

export default Start;