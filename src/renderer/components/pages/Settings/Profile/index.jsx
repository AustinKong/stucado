import { SettingsInput } from '..';
import { useSelector } from 'react-redux';
import { changeUsername, changeStatus } from '@services/settings';

const Profile = () => {
  const settings = useSelector((state) => state.settings);
  return (
    <>
      <SettingsInput
        title="Username"
        description="Name to display in the app. This is only visible to you"
        value={settings.username}
        onChange={(e) => changeUsername(e.target.value)}
      />
      <SettingsInput
        title="Status"
        description="Status to display in the app. This is only visible to you"
        value={settings.status}
        onChange={(e) => changeStatus(e.target.value)}
      />
    </>
  );
};

export default Profile;
