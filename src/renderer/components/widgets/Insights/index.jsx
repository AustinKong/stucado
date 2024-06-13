import { Widget, InteractionButton } from '@components/widgets/Widget';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import workingImage from '@assets/illustrations/working.png';
import { generateMessage } from '@services/insights';
import './styles.css';

const Insights = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    generateMessage().then((response) => {
      setMessage(response);
    });
  }, []);

  const refresh = () => {
    setMessage(null);
    generateMessage().then((response) => {
      setMessage(response);
    });
  };

  return (
    <Widget
      className="insights"
      title="Insights"
      interaction={<InteractionButton icon={<ArrowsClockwise />} text="Refresh" onClick={refresh} />}
    >
      {!message && <div className="insights__loading">Generating your personalized message...</div>}
      {message && (
        <div className="insights__content">
          <img src={workingImage} alt="Working" className="insights__illustration" />
          <p className="insights__main-text">{message.mainText}</p>
          <p className="insights__sub-text">{message.subText}</p>
        </div>
      )}
    </Widget>
  );
};

export default Insights;
