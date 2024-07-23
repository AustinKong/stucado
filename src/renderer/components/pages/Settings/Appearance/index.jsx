import { useSelector } from 'react-redux';
import { setTheme, setColorTheme } from '@services/settings';
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
      <SettingsDropdown
        title="Color Scheme"
        description="Choose your preferred color scheme"
        value={settings.colorTheme}
        options={[
          { value: 'blue', label: 'Blue' },
          { value: 'green', label: 'Green' },
          { value: 'purple', label: 'Purple' },
          { value: 'magenta', label: 'Magenta' },
        ]}
        onChange={(e) => setColorTheme(e.value)}
      />
    </>
  );
};

export default Appearance;
