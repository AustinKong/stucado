import { Widget, InteractionButton } from '@components/widgets/Widget';
import { ArrowsClockwise } from '@phosphor-icons/react';

import '@styles/widgets/insights.css';

const Insights = () => {
  return (
    <Widget
      className="insights"
      title="Insights"
      interaction={<InteractionButton icon={<ArrowsClockwise />} text="Refresh" onClick={() => console.log('click')} />}
    >
      <div className="insights__content">
        <p className="insights__main-text">Welcome back, it&apos;s time to get to work!</p>
        <p className="insights__sub-text">Your productivity is up by 25% at this time of the day!</p>
      </div>
    </Widget>
  );
};

export default Insights;
