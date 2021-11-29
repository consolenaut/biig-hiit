import { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Storage, Drivers } from '@ionic/storage';
import { Brightness } from '@ionic-native/brightness';
import { StatusBar } from '@ionic-native/status-bar';

import Timer from './components/Timer';
import Start from './components/Start';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './theme/fonts.css';
import './theme/general.css';

import useSound from 'use-sound';
import introSound from './components/Timer/sounds/intro.m4a';

const store = new Storage({
  name: 'statesDb',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
})

const INITIAL_STEPS = 6;
const INITIAL_REPS = 2;
const INITIAL_WORK = 40;
const INITIAL_REST = 20;
const INITIAL_BREAK = 60;

const INITIAL_STATES = {
  steps: INITIAL_STEPS,
  reps: INITIAL_REPS,
  work: INITIAL_WORK,
  rest: INITIAL_REST,
  break: INITIAL_BREAK,
}

const App: React.FC = () => {
  const [states, setStates] = useState<any>(INITIAL_STATES);
  const [storeCreated, setStoreCreated] = useState<boolean>(false);
  const [playIntro] = useSound(introSound);

  const persistStates = async (nextStates: any) => await store.set('states', JSON.stringify(nextStates));
  const getPersistedStates = async () => await store.get('states');

  useEffect(() => {
    Brightness.setKeepScreenOn(true);
		const setupStore = async () => {
      await store.create();
      const storedStates = await getPersistedStates();

      if (storedStates) { 
        setStates(JSON.parse(storedStates)); 
        setStoreCreated(true);
      } else {
        await persistStates(INITIAL_STATES);
        setStates(INITIAL_STATES);
        setStoreCreated(true);
      } 
		}

		setupStore();
	}, []);

  const handleSetStates = async (change: any) => {
    await setStates((currentState: any) => {
      const nextState = { ...currentState, ...change };
      persistStates(nextState);
      return nextState;
    });
  }

  if (!storeCreated) return null;

  return (
    <>
        <IonReactRouter>
            <Route path="/" exact={true}>
              <Redirect to="/start" />
            </Route>

            <Route path="/start" exact={true}>
              <Start states={states} setStates={handleSetStates} />
            </Route>            

            <Route path="/running" exact={true}>
              <Timer 
                steps={states.steps} 
                reps={states.reps} 
                playIntro={playIntro}
                durations={{ work: states.work, rest: states.rest, break: states.break }} 
              />
            </Route>
        </IonReactRouter>
    </>
  );
};

export default App;
