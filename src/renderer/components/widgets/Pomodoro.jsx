import { GearSix } from '@phosphor-icons/react';

import { Widget, InteractionButton } from '@components/widgets/Widget';

const Pomodoro = () => {
  return (
    <Widget className="pomodoro" title="Pomodoro" interaction={<InteractionButton text="Edit" icon={<GearSix />} />}>
      Pomo
    </Widget>
  );
};

export default Pomodoro;
