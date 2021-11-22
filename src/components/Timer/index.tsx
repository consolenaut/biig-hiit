import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import useSound from 'use-sound';

import pausedSound from './sounds/ClockSlow.m4a';
import unpausedSound from './sounds/ClockFast.m4a';

import workSound from './sounds/work.m4a';
import restSound from './sounds/rest.m4a';
import breakSound from './sounds/break.m4a';

import introSound from './sounds/intro.m4a';

import backSound from './sounds/Checked.m4a';

import { useInterval } from '../../useInterval';
import Circle from '../Circle';
import Confetti from 'react-confetti'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #1A1A1A;
`;

const StepCounter = styled.h1<{ paused?: boolean }>`
  font-size: 36px;
  line-height: 36px;
  position: absolute;
  text-align: left;
  width: 100%;
  top: 0px;
  left: 20px;
  color: ${({ paused }) => paused ? '#666' : '#fff' };
  font-family: "Delerium NCV";
`;

const RepCounter = styled.h1<{ paused?: boolean }>`
  font-size: 36px;
  line-height: 36px;
  position: absolute;
  text-align: right;
  width: 100%;
  top: 0px;
  right: 20px;
  color: ${({ paused }) => paused ? '#666' : '#fff' };
  font-family: "Delerium NCV";
`;

const EndButton = styled.div<{ show?: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #666;
  position: absolute;
  bottom: 50px;
  left: 50%;
  margin-left: -50px;
  display: ${({ show }) => show ? 'block' : 'none' };
`;

const INITIAL_MODE = 'intro';
const INTRO_DURATION = 3;

interface TimerProps {
  steps: number;
  reps: number;
  durations: any;
}

const Timer: React.FC<TimerProps> = ({ steps, reps, durations }) => {
  const history = useHistory();
  const [totalSize, setTotalSize] = useState(0);
  const [stepSize, setStepSize] = useState(0);
  const [playIntro] = useSound(introSound);
  const [playPaused] = useSound(pausedSound);
  const [playUnpaused] = useSound(unpausedSound);
  const [playWork] = useSound(workSound);
  const [playRest] = useSound(restSound);
  const [playBreak] = useSound(breakSound);
  const [playBack] = useSound(backSound);

  const [timerState, setTimerState] = useState({
    step: 0,
    rep: 0,
    secondsRemaining: 0,
    circleSize: 0,
    circleColor: 'none',
    isRunning: false,
    direction: 'none',
    shouldRumble: false,
    rumble: false,
    mode: INITIAL_MODE,
    message: '',
    confetti: false,
    showEndButton: false,
  })

  const updateTimerState = (update: any) => setTimerState(previousState => ({ ...previousState, ...update }));
  const incrementRep = () => setTimerState(previousState => ({ ...previousState, rep: previousState.rep + 1 }));
  const incrementStep = () => setTimerState(previousState => ({ ...previousState, step: previousState.step + 1 }));
  const resetStep = () => setTimerState(previousState => ({ ...previousState, step: 1 }));

  const togglePause = () => setTimerState(previousState => {
    if (previousState.isRunning) playPaused();
    if (!previousState.isRunning) playUnpaused();
    return ({ ...previousState, isRunning: !previousState.isRunning, showEndButton: !previousState.showEndButton })
  });

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight
    const diagonal = Math.sqrt(width*width + height*height);
    setTotalSize(diagonal);
    transitionTo('intro');
  }, []);

  useInterval(() => {
    if (timerState.secondsRemaining === 0 ) {
      nextStep(timerState.step, steps, timerState.rep, reps, timerState.mode);
    } else {
      if (timerState.secondsRemaining < 7 && timerState.shouldRumble && !timerState.rumble) updateTimerState({ rumble: true });
      const remaining = timerState.secondsRemaining - 1;
      updateTimerState({ secondsRemaining: remaining });
      if (timerState.direction === 'in') {
        updateTimerState({ circleSize: remaining * stepSize });
      } else if (timerState.direction === 'out') {
        updateTimerState({ circleSize: totalSize - (remaining * stepSize) });
      }
    }
  }, timerState.isRunning ? 1000 : null);

const transitionTo = (mode: string) => {
    if (mode === 'intro') {
      playIntro();
      updateTimerState({
        mode: 'intro',
        secondsRemaining: INTRO_DURATION,
        circleColor: 'none',
        direction: 'none',
        step: 1,
        rep: 1,
        isRunning: true,
        shouldRumble: false,
        rumble: false,
        circleSize: totalSize,
      });
    } else if (mode === 'work') {
      playWork();
      updateTimerState({
        mode: 'work',
        secondsRemaining: durations.work,
        circleColor: 'orange',
        direction: 'in',
        shouldRumble: true,
        circleSize: totalSize,
      });
      setStepSize(totalSize/durations.work);
    } else if (mode === 'rest') {
      playRest();
      updateTimerState({
        mode: 'rest',
        secondsRemaining: durations.rest,
        circleColor: 'blue',
        direction: 'out',
        shouldRumble: false,
        rumble: false,
        circleSize: 60,
      });
      setStepSize(totalSize/durations.rest);
    } else if (mode === 'break') {
      playBreak();
      updateTimerState({
        mode: 'break',
        secondsRemaining: durations.break,
        circleColor: 'none',
        direction: 'none',
        shouldRumble: false,
        rumble: false,
      });
    } else if (mode === 'done') {
      playPaused();
      updateTimerState({
        mode: 'done',
        isRunning: false,
        message: 'DONE',
        confetti: true,
        circleColor: 'none',
        direction: 'none',
        shouldRumble: false,
        rumble: false,
        showEndButton: true,
      });
    }
  }

  const nextStep = (step: number, totalSteps: number, rep: number, totalReps: number, mode: string) => {
    if (mode === 'intro') {
      transitionTo('work');
    } else if (mode === 'work') {
      if (step === totalSteps) transitionTo('break');
      else transitionTo('rest');
    } else if (mode === 'rest') {
      incrementStep();
      transitionTo('work');
    } else if (mode === 'break') {
      if (rep === totalReps) transitionTo('done');
      else { resetStep(); transitionTo('work'); }
      incrementRep();
    }
  }

  return (
    <Container onClick={() => timerState.mode !== 'done' && togglePause()}>
      <Circle circleSize={timerState.circleSize} circleColor={timerState.circleColor} shouldRumble={timerState.rumble} paused={!timerState.isRunning}>{timerState.message ? timerState.message : timerState.secondsRemaining}</Circle>
      <StepCounter paused={!timerState.isRunning}>{timerState.step}/{steps}</StepCounter>
      <RepCounter paused={!timerState.isRunning}>{timerState.rep}/{reps}</RepCounter>
      <EndButton show={timerState.showEndButton} onClick={(e) => { e.stopPropagation(); playBack(); history.push("/start") }} />
      { timerState.confetti && <Confetti width={window.innerWidth} height={window.innerHeight} /> }
    </Container>
  );
};

export default Timer;
