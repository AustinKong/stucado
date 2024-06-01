import { IconContext, GearSix, FastForward, Play, Pause, Stop } from '@phosphor-icons/react';

import { Widget, InteractionButton } from '@components/widgets/Widget';
import '@styles/widgets/pomodoro.css';

const FULL_DASH_ARRAY = 2 * Math.PI * 45;

const Pomodoro = () => {
  // https://react.dev/learn/referencing-values-with-refs
  // TODO: Use this for the timeout id
  return (
    <Widget className="pomodoro" title="Pomodoro" interaction={<InteractionButton text="Edit" icon={<GearSix />} />}>
      <div className="pomodoro__content">
        <PomodoroTimer />
        <PomodoroControls />
      </div>
    </Widget>
  );
};

const PomodoroTimer = () => {
  return (
    <div className="pomodoro-timer">
      <svg className="pomodoro-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="pomodoro-timer__circle">
          <circle className="pomodoro-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            strokeDasharray={`${(3 / 7) /* A fraction */ * FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`}
            className="pomodoro-timer__path-remaining"
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
          />
        </g>
      </svg>
      <span className="pomodoro-timer__label">2:00</span>
    </div>
  );
};

const PomodoroControls = () => {
  return (
    <div className="pomodoro-controls">
      <IconContext.Provider
        value={{
          size: 32,
          weight: 'fill',
        }}
      >
        <div className="pomodoro-controls__secondary">
          <FastForward className="pomodoro-controls__skip" />
        </div>
        <div className="pomodoro-controls__main">
          {false ? <Play className="pomodoro-controls__play" /> : <Pause className="pomodoro-controls__pause" />}
        </div>
        <div className="pomodoro-controls__secondary">
          <Stop className="pomodoro-controls__stop" />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Pomodoro;
