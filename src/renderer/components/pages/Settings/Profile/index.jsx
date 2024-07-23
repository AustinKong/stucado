import { SettingsInput, SettingsDropdown } from '..';
import { useSelector } from 'react-redux';
import { changeUsername, changeStatus, changeProfilePicture } from '@services/settings';

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
      <SettingsDropdown
        title="Profile picture"
        description="Choose a profile picture. This is only visible to you"
        value={settings.profilePicture}
        options={[
          { value: 'studious', label: 'Studious Avocado' },
          { value: 'playful', label: 'Playful Avocado' },
          { value: 'chill', label: 'Chill Avocado' },
        ]}
        onChange={(e) => changeProfilePicture(e.value)}
      />
    </>
  );
};

export default Profile;
