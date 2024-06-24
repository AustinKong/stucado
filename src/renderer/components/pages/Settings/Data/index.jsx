import { clearData } from '@services/general';
import { SettingsButton } from '..';
import Modal, { ModalHeader, ModalTitle, ModalSubtitle, ModalBody, ModalFooter } from '@components/generic/Modal';
import Button from '@components/generic/Button';
import { useState } from 'react';

const Data = () => {
  const [clearDataModalIsOpen, setClearDataModalIsOpen] = useState(false);

  return (
    <>
      <SettingsButton
        title="Clear Data"
        description="Clear all data stored in the app. This action is irreversible."
        onClick={() => setClearDataModalIsOpen(true)}
        buttonText="Clear"
        buttonAppearance="danger"
      />
      {clearDataModalIsOpen && <ClearDataModal onClose={() => setClearDataModalIsOpen(false)} />}
    </>
  );
};

const ClearDataModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Clear Data</ModalTitle>
        <ModalSubtitle>Are you sure you want to clear all data stored in the app?</ModalSubtitle>
      </ModalHeader>
      <ModalBody>
        <p>All data is stored locally in your device, no data is sent to our servers or the cloud.</p>
        <p style={{ color: 'var(--text-danger)' }}>This action is irreversible.</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} appearance="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            clearData();
            onClose();
          }}
          appearance="danger"
        >
          Clear
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Data;
