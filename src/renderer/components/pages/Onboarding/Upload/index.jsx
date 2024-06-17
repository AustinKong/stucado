import { uploadTimetable } from '@services/timetable';
import UploadInstructions1 from '@assets/images/uploadInstructions1.png';
import UploadInstructions2 from '@assets/images/uploadInstructions2.png';
import Section from '@components/pages/Onboarding/Section';
import { useState } from 'react';
import styles from './styles.module.css';
import Button from '@components/generic/Button';
import Input from '@components/generic/Input';

const Upload = ({ handleStep }) => {
  const [timetableUrl, setTimetableUrl] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(true);

  const handleSubmit = async () => {
    const result = await uploadTimetable(timetableUrl);
    if (!result) {
      setUploadSuccess(false);
      return;
    }
    handleStep();
  };

  return (
    <Section
      title="Upload your timetable"
      description="Upload your timetable to get started with Stucado. This enables access to features such as timetable widget, timetable optimization and productiviy analysis."
    >
      <h2>Upload your timetable</h2>
      <h3>Upload your NUS Mods timetable by pasting the URL from the website.</h3>

      <div className={styles.upload__instructions}>
        <div className={styles.upload__step}>
          <img className={styles.upload__stepImage} src={UploadInstructions1} />
          <p className={styles.upload__stepDescription}>
            Head over to NUS Mods and click on the &quot;Share/Sync&quot; button
          </p>
        </div>
        <div className={styles.upload__step}>
          <img className={styles.upload__stepImage} src={UploadInstructions2} />
          <p className={styles.upload__stepDescription}>
            Copy the URL by pressing the red button, and paste it in the input field below
          </p>
        </div>
      </div>
      <Input
        value={timetableUrl}
        onChange={(event) => setTimetableUrl(event.target.value)}
        placeholder="Paste your NUS Mods timetable URL here"
      />
      {!uploadSuccess && (
        <p className={styles.error}>
          Error uploading your timetable, please check your input and try again or skip this step.
        </p>
      )}

      <div className={styles.upload__footer}>
        <Button onClick={handleStep} appearance="secondary">
          Skip
        </Button>
        {!uploadSuccess && (
          <Button onClick={handleSubmit} appearance="danger">
            Retry
          </Button>
        )}
        {uploadSuccess && <Button onClick={handleSubmit}>Upload timetable</Button>}
      </div>
    </Section>
  );
};

export default Upload;
