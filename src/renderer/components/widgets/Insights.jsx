import { Widget, InteractionButton } from '@components/widgets/Widget';
import { ArrowsClockwise } from '@phosphor-icons/react';

const Insights = () => {
  return (
    <Widget
      className="insights"
      title="Insights"
      interaction={<InteractionButton icon={<ArrowsClockwise />} text="Refresh" onClick={() => console.log('click')} />}
    >
      <p>Coming soon...</p>
    </Widget>
  );
};

export default Insights;
