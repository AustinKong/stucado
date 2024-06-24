import Button from '@components/generic/Button';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalSubtitle, ModalTitle } from '@components/generic/Modal';
import { clearTimetable } from '@services/timetable';

const ResetModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Reset Timetable</ModalTitle>
        <ModalSubtitle>Are reset the timetable and clear everything inside?</ModalSubtitle>
      </ModalHeader>
      <ModalBody>
        <p style={{ color: 'var(--text-danger)' }}>This action is irreversible.</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} appearance="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            clearTimetable();
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

export default ResetModal;
