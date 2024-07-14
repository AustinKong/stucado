import { useEffect } from 'react';
import { retrieveTimetable } from '@services/timetable';
import { retrieveTasks } from '@services/tasks';
import { retrieveSettings } from '@services/settings';
import { retrievePomodoroSettings } from '@services/pomodoro';

const useRetrieveData = () => {
  useEffect(() => {
    void retrieveTasks();
    void retrieveTimetable();
    void retrieveSettings();
    void retrievePomodoroSettings();
  }, []);
};

export default useRetrieveData;
