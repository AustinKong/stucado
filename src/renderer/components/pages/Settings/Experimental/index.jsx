import { SettingsButton } from '..';
import { generateTestData, resetOnboarding, tearDown } from '@services/experimental';

const Experimental = () => {
  return (
    <>
      <SettingsButton
        title="Generate Test Data"
        description="Populate the database with 30 days worth of randomly generated test data. Used for testing the functionality of the app."
        onClick={() => generateTestData()}
        buttonText="Generate"
      />
      <SettingsButton
        title="Reset Onboarding"
        description="Reset the onboarding process. This will allow you to do the onboarding process again on next startup."
        onClick={() => resetOnboarding()}
        buttonText="Reset"
        buttonAppearance="warn"
      />
      <SettingsButton
        title="Tear Down"
        description="Delete all data from the database. Used during automated testing to reset the database."
        onClick={() => tearDown()}
        buttonText="Tear Down"
        buttonAppearance="danger"
      />
    </>
  );
};

export default Experimental;
