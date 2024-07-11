import { SettingsToggle } from '..';
import { useSelector } from 'react-redux';
import { toggleNotifications } from '@services/settings';

const General = () => {
  const settings = useSelector((state) => state.settings);
  console.log(settings)

  return (
    <>
      <SettingsToggle
        title="Notifications"
        description="Receive notifications for pomodoro reminders"
        value={settings.notifications}
        onChange={() => toggleNotifications()}
      />
    </>
  );
};

export default General;
