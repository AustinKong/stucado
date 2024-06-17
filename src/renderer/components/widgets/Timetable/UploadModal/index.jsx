import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalSubtitle } from '@components/generic/Modal';
import Button from '@components/generic/Button';
import Input from '@components/generic/Input';
import { uploadTimetable } from '@services/timetable';
import { useState } from 'react';

const UploadModal = ({ onClose }) => {
  const [formContent, setFormContent] = useState({ url: '' });
  const [uploadSuccess, setUploadSuccess] = useState(true);

  const handleChange = (event) => {
    setFormContent({ ...formContent, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await uploadTimetable(formContent.url);
    setUploadSuccess(success);

    if (success) {
      onClose();
    }
    setFormContent({ url: '' });
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle appearance={uploadSuccess ? 'default' : 'danger'}>Upload timetable</ModalTitle>
        <ModalSubtitle>Import your NUS Mods timetable via URL in order to make use of some features.</ModalSubtitle>
      </ModalHeader>
      <ModalBody>
        {!uploadSuccess && <p>Error uploading, please retry</p>}
        <Input label="Timetable URL" name="url" value={formContent.url} onChange={handleChange} required={true} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} appearance="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UploadModal;
