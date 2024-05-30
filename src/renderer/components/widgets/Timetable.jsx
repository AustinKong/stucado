import { Upload } from '@phosphor-icons/react';

import { Widget, InteractionButton } from '@components/widgets/Widget';
import '@styles/widgets/timetable.css';

const Timetable = () => {
  return (
    <Widget
      className="timetable"
      title={'Timetable'}
      interaction={<InteractionButton icon={<Upload />} text="Upload timetable" onClick={() => console.log('click')} />}
    >
      Pending...
    </Widget>
  );
};

export default Timetable;
