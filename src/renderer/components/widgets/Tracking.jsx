import { IconContext, Clock, CheckSquare, Book, DotsThreeCircleVertical } from '@phosphor-icons/react';

import '@styles/widgets/tracking.css';

const Tracking = ({ gridArea, title, subtext, bgColor, icon, text }) => {
  return (
    <div className="tracking" style={{ backgroundColor: bgColor, gridArea }}>
      <div className="tracking__header">
        <h2 className="tracking__title">{title}</h2>
        <DotsThreeCircleVertical className="tracking__edit" />
      </div>
      <div className="tracking__content">
        <p className="tracking__text">{text}</p>
        <div className="tracking__icon">
          <IconContext.Provider value={{ size: 36 }}>{icon}</IconContext.Provider>
        </div>
      </div>
      <p className="tracking__subtext">{subtext}</p>
    </div>
  );
};

export const HoursFocused = () => {
  return (
    <Tracking
      gridArea="hoursFocused"
      title="Hours Focused"
      subtext="Time spent being productive today"
      bgColor="#d5d1e9"
      icon={<Clock />}
      text={'3 hrs'}
    />
  );
};

export const TasksCompleted = () => {
  return (
    <Tracking
      gridArea="tasksCompleted"
      title="Tasks Completed"
      subtext="Number of tasks completed today"
      bgColor="#FDD998"
      icon={<CheckSquare />}
      text={'5 tasks'}
    />
  );
};

export const AverageProductivity = () => {
  return (
    <Tracking
      gridArea="averageProductivity"
      title="Average Productivity"
      subtext="Your average productivity today"
      bgColor="#C7DCA7"
      icon={<Book />}
      text={'125%'}
    />
  );
};
