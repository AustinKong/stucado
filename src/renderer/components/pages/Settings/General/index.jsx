import { SettingsInput, SettingsToggle } from '..';
import { useSelector } from 'react-redux';
import { toggleNotifications, changeExternalLink } from '@services/settings';

const General = () => {
  const settings = useSelector((state) => state.settings);
  return (
    <>
      <SettingsToggle
        title="Notifications"
        description="Receive notifications for pomodoro reminders"
        value={settings.notifications}
        onChange={() => toggleNotifications()}
      />
      <SettingsInput
        title="External Link"
        description="Link to open when clicking on the app icon"
        value={settings.externalLink || ''}
        onChange={(e) => changeExternalLink(e.target.value)}
      />
    </>
  );
};

export default General;
