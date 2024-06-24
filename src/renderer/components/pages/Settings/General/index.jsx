import { SettingsToggle } from '..';
import { useSelector } from 'react-redux';
import { setReceiveNotifications } from '@services/settings';

const General = () => {
  const settings = useSelector((state) => state.settings);

  return (
    <>
      <SettingsToggle
        title="Notifications"
        description="Receive notifications for important events and pomodoro reminders"
        value={settings.receiveNotifications}
        onChange={() => setReceiveNotifications(!settings.receiveNotifications)}
      />
    </>
  );
};

export default General;
