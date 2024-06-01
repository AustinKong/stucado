import { PlusCircle, DotsThreeCircle } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import '@styles/widgets/taskList.css';
import { Widget, InteractionButton } from '@components/widgets/Widget';
import { incrementTaskStatus, decrementTaskStatus, createTask } from '@services/tasks';
import {
  Modal,
  ModalTextInput,
  ModalNumberInput,
  ModalBeside,
  ModalFooter,
  ModalButtonPrimary,
  ModalButtonSecondary,
} from '@components/generic/Modal';
import { deleteTask, editTask } from '@services/tasks';

/*
  Tasks are in format of: {
    id: number,
    title: string,
    description: string,
    status: 'pending' | 'inProgress' | 'completed',
    estimatedTime: number (in minutes),
    beginTime: Date,
    endTime: Date,
}
*/

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false);

  return (
    <Widget
      className="task-list"
      title={'Tasks (3)'}
      interaction={
        <InteractionButton icon={<PlusCircle />} text="Add a new task" onClick={() => setAddTaskModalIsOpen(true)} />
      }
    >
      <ul className="task-list__list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>

      <AddTaskModal isOpen={addTaskModalIsOpen} onClose={() => setAddTaskModalIsOpen(false)} />
    </Widget>
  );
};

const TaskItem = ({ task }) => {
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);

  const taskStatusToCSS = (status) =>
    status === 'Pending' ? 'pending' : status === 'InProgress' ? 'in-progress' : 'completed';

  const handleToggleTaskStatus = (event) => {
    if (event.type === 'click') {
      void incrementTaskStatus(task.id);
    } else if (event.type === 'contextmenu') {
      void decrementTaskStatus(task.id);
    }
  };

  return (
    <li className="task-item">
      <div
        className={`task-item__status task-item__status--${taskStatusToCSS(task.status)}`}
        onClick={handleToggleTaskStatus}
        onContextMenu={handleToggleTaskStatus}
      />
      <div className="task-item__content">
        <p className="task-item__title">{task.content}</p>
        <p className="task-item__description">Yet to add task descriptions</p>
      </div>
      <DotsThreeCircle
        className="task-item__edit"
        size="24"
        color="var(--text-secondary)"
        onClick={() => setEditTaskModalIsOpen(true)}
      />

      <EditTaskModal task={task} isOpen={editTaskModalIsOpen} onClose={() => setEditTaskModalIsOpen(false)} />
    </li>
  );
};

const AddTaskModal = ({ isOpen, onClose }) => {
  const [formContent, setFormContent] = useState({ content: '', estimatedTime: 0, description: '' });

  const handleChange = (event) => {
    setFormContent({ ...formContent, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void createTask(formContent.content, formContent.estimatedTime);
    setFormContent({ content: '', estimatedTime: 0, description: '' });
    onClose();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormContent({ content: '', estimatedTime: 0, description: '' });
    onClose();
  };

  return (
    <Modal title="Add task" subtitle="Add a new task" isOpen={isOpen} onClose={onClose}>
      <ModalTextInput
        title="Content"
        nameKey="content"
        value={formContent.content}
        onChange={handleChange}
        required={true}
      />
      <ModalTextInput
        title="Description (optional)"
        nameKey="description"
        value={formContent.description}
        onChange={handleChange}
      />
      <ModalBeside>
        <ModalNumberInput
          title="Estimated time (minutes)"
          nameKey="estimatedTime"
          value={formContent.estimatedTime}
          onChange={handleChange}
          required={true}
        />
        <ModalNumberInput
          title="Estimated time (hours)"
          nameKey="estimatedTime"
          value={formContent.estimatedTime}
          onChange={handleChange}
          required={true}
        />
      </ModalBeside>
      <ModalFooter
        right={
          <>
            <ModalButtonSecondary text="Cancel" onClick={handleCancel} />
            <ModalButtonPrimary text="Submit" onClick={handleSubmit} />
          </>
        }
      />
    </Modal>
  );
};

const EditTaskModal = ({ task, isOpen, onClose }) => {
  const [formContent, setFormContent] = useState({ content: task.content, estimatedTime: task.estimatedTime });

  const handleChange = (event) => {
    setFormContent({ ...formContent, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void editTask({ ...task, ...formContent });
    onClose();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    void deleteTask(task.id);
    onClose();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormContent({ content: task.content, estimatedTime: task.estimatedTime });
    onClose();
  };

  return (
    <Modal title="Edit task" subtitle="Modify task information" isOpen={isOpen} onClose={onClose}>
      <ModalTextInput
        title="Content"
        nameKey="content"
        value={formContent.content}
        onChange={handleChange}
        required={true}
      />
      <ModalBeside>
        <ModalNumberInput
          title="Estimated time (minutes)"
          nameKey="estimatedTime"
          value={formContent.estimatedTime}
          onChange={handleChange}
          required={true}
        />
        <ModalNumberInput
          title="Estimated time (hours)"
          nameKey="estimatedTime"
          value={formContent.estimatedTime}
          onChange={handleChange}
          required={true}
        />
      </ModalBeside>
      <ModalFooter
        left={<ModalButtonSecondary text="Delete task" onClick={handleDelete} />}
        right={
          <>
            <ModalButtonSecondary text="Cancel" onClick={handleCancel} />
            <ModalButtonPrimary text="Submit" onClick={handleSubmit} />
          </>
        }
      />
    </Modal>
  );
};

export default TaskList;
