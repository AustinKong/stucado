import Widget, { InteractionButton } from '@components/widgets/Widget';
import { ArrowsClockwise, ChatTeardropText } from '@phosphor-icons/react';
import { useEffect } from 'react';

import workingImage from '@assets/illustrations/working.png';
import { runModel } from '@services/insights';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';

const Insights = () => {
  const message = useSelector((state) => state.insights.message);

  const refresh = () => {
    void runModel();
  };

  useEffect(refresh, []);

  return (
    <Widget
      className={styles.insights}
      title="Insights"
      interaction={<InteractionButton icon={<ArrowsClockwise />} text="Refresh" onClick={refresh} />}
    >
      {!message && (
        <div className={styles.insights__loading}>
          <ChatTeardropText size={24} />
          &nbsp; Generating your personalized message...
        </div>
      )}
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
