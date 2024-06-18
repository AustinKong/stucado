import { ArrowsClockwise } from '@phosphor-icons/react';

import Widget, { InteractionButton } from '@components/widgets/Widget';
import LineChart from '@components/generic/LineChart';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { getTasksCompleted } from '@services/statistics';

const TasksCompletedLineChart = () => {
  const [tasksCompleted, setTasksCompleted] = useState(null);
  const [range, setRange] = useState(14);

  const cycleRange = () => {
    if (range === 14) {
      setRange(30);
    } else if (range === 30) {
      setRange(7);
    } else {
      setRange(14);
    }
  };

  useEffect(() => {
    getTasksCompleted(range).then((result) => {
      setTasksCompleted(
        result.map((stat) => {
          return {
            Date: stat.date.toLocaleDateString('en-US'),
            'Tasks completed': Math.round(stat.completedTasks),
          };
        })
      );
    });
  }, [range]);

  return (
    <Widget
      className={styles.tasksCompletedLineChart}
      title={'Tasks Completed'}
      interaction={<InteractionButton icon={<ArrowsClockwise />} text={`Last ${range} days`} onClick={cycleRange} />}
    >
      {tasksCompleted && <LineChart data={tasksCompleted} xKey="Date" yKey="Tasks completed" />}
    </Widget>
  );
};

export default TasksCompletedLineChart;
