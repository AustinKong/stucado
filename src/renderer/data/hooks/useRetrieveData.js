import { useEffect } from 'react';
import { retrieveTimetable } from '@services/timetable';
import { retrieveTasks } from '@services/tasks';
import { retrieveSettings } from '@services/settings';

const useRetrieveData = () => {
  useEffect(() => {
    void retrieveTasks();
    void retrieveTimetable();
    void retrieveSettings();
  }, []);
};

export default useRetrieveData;
