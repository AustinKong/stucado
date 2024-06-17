import { useState } from 'react';
import { completeOnboarding } from '@services/settings';
import Habits from '@components/pages/Onboarding/Habits';
import Upload from '@components/pages/Onboarding/Upload';
import Welcome from '@components/pages/Onboarding/Welcome';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const handleNextStep = () => {
    if (step == 2) void completeOnboarding();
    setStep(step + 1);
  };

  return (
    <>
      {step === 0 && <Welcome handleStep={handleNextStep} />}
      {step === 1 && <Upload handleStep={handleNextStep} />}
      {step === 2 && <Habits handleStep={handleNextStep} />}
    </>
  );
};

export default Onboarding;
