import Widget, { InteractionButton } from '@components/widgets/Widget';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import workingImage from '@assets/illustrations/working.png';
import { generateMessage } from '@services/insights';
import styles from './styles.module.css';

const Insights = () => {
  const [message, setMessage] = useState(null);

  const refresh = () => {
    setMessage(null);
    generateMessage().then((response) => {
      setMessage(response);
    });
  };

  useEffect(refresh, []);

  return (
    <Widget
      className={styles.insights}
      title="Insights"
      interaction={<InteractionButton icon={<ArrowsClockwise />} text="Refresh" onClick={refresh} />}
    >
      {!message && <h3 className={styles.insights__loading}>Generating your personalized message...</h3>}
      {message && (
        <div className={styles.insights__content}>
          <img src={workingImage} alt="Working" className={styles.insights__illustration} />
          <h2 className={styles.insights__mainText}>{message.mainText}</h2>
          <p className={styles.insights__subText}>{message.subText}</p>
        </div>
      )}
    </Widget>
  );
};

export default Insights;
