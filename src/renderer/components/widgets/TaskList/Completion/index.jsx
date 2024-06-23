import styles from './styles.module.css';

const Completion = ({ tasks }) => {
  const totalTasks = tasks.length;
  const totalTime = tasks.reduce((acc, task) => acc + +task.estimatedTime, 0);

  const completedTasks = tasks.filter((task) => task.status === 'Completed');
  const completedTasksTime = completedTasks.reduce((acc, task) => acc + +task.estimatedTime, 0);
  const completedTasksPercentage = (completedTasksTime / totalTime) * 100;

  const inProgressTasks = tasks.filter((task) => task.status === 'InProgress');
  const inProgressTasksTime = inProgressTasks.reduce((acc, task) => acc + +task.estimatedTime, 0);
  const inProgressTasksPercentage = (inProgressTasksTime / totalTime) * 100;

  const pendingTasks = tasks.filter((task) => task.status === 'Pending');
  const pendingTasksTime = pendingTasks.reduce((acc, task) => acc + +task.estimatedTime, 0);
  const pendingTasksPercentage = (pendingTasksTime / totalTime) * 100;

  const statusInfo = [
    {
      status: 'Completed',
      time: completedTasksTime,
      percentage: completedTasksPercentage,
      color: 'var(--background-success)',
    },
    {
      status: 'In Progress',
      time: inProgressTasksTime,
      percentage: inProgressTasksPercentage,
      color: 'var(--background-warning)',
    },
    {
      status: 'Pending',
      time: pendingTasksTime,
      percentage: pendingTasksPercentage,
      color: 'var(--background-danger)',
    },
  ];

  return (
    <div className={styles.completion}>
      <div className={styles.completion__header}>
        <small>
          {completedTasks.length} of {totalTasks} tasks completed ({Math.round(completedTasksPercentage) || 0}%)
        </small>
      </div>
      <div className={styles.completion__bars}>
        {statusInfo.map((info) => {
          return info.percentage > 0 ? (
            <div
              key={info.status}
              className={styles.completion__bar}
              style={{ minWidth: `calc(${info.percentage}%)`, backgroundColor: info.color }}
            />
          ) : null;
        })}
        {!statusInfo.some((info) => info.percentage > 0) && <div className={styles.completion__bar} />}
      </div>
      <div className={styles.completion__footer}>
        <div className={styles.completion__legend}>
          {statusInfo.map((info) => (
            <div key={info.status} className={styles.completion__legendItem}>
              <div className={styles.completion__legendColor} style={{ backgroundColor: info.color }} />
              <small className={styles.completion__legendText}>{info.status}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Completion;
