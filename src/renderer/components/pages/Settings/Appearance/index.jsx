import { useSelector } from 'react-redux';
import { setTheme } from '@services/settings';
import { SettingsDropdown } from '..';

const Appearance = () => {
  const settings = useSelector((state) => state.settings);

  return (
    <>
      <SettingsDropdown
        title="Theme"
        description="Choose your preferred theme"
        value={settings.theme}
        options={[
          { value: 'system', label: 'System Default' },
          { value: 'light', label: 'Light Theme' },
          { value: 'dark', label: 'Dark Theme' },
        ]}
        onChange={(e) => setTheme(e.value)}
      />
    </>
  );
};

export default Appearance;
