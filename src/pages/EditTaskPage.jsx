import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateTask } from "../utils/taskUtils";
import { Header } from "../components/Header";
import { Sidepanel } from "../components/Sidepanel";
import UploadImgaeIcon from "../assets/icons/ui/upload-image-icon.svg";
import TrashIcon from "../assets/icons/actions/trash-icon.svg";
import AddIcon from "../assets/icons/actions/add-square-icon.svg";
import './EditTaskPage.css';

export function EditTaskPage({ projects, setProjects, tasks, setTasks }) {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const task = tasks.find(t => t.id === taskId);

  const [ title, setTitle ] = useState(task.title);
  const [ description, setDescription ] = useState(task.description);
  const [ priority, setPriority ] = useState(task.priority);
  const [ tags, setTags ] = useState(task.tags || []);
  const [ dueDate, setDueDate ] = useState(task.dueDate);


  const handleSave = (event) => {
    event.preventDefault();

    const patch = {
      title,
      description,
      priority,
      tags,
      dueDate
    };

    updateTask(tasks, setTasks, taskId, patch);

    navigate(`/project/${projectId}`);
  }

  const handleCancel = () => {
    navigate(`/project/${projectId}`);
  }

  return (
    <main className='edit-task--page page'>
      <Header />
      <Sidepanel 
        setProjects={setProjects} 
        projects={projects} 
        projectId={projectId} 
      />

      <div className='content edit-task-page__content'>
        <input 
          type='text'
          value={title}
          placeholder="Task title" 
          className="edit-task-page__title-input"
          aria-label="Task title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <form className="edit-task-page__form" onSubmit={handleSave}>
          <section className="edit-task-page__section edit-task-page__priority-section">
            <h2 className="edit-task-page__section-title">Priority</h2>
            <div className="edit-task-page__buttons-group">
              {["low", "medium", "high"].map(level => (
                <button 
                  key={level}
                  type="button" 
                  className={`priority priority--${level} ${
                    priority === level ? "priority--selected" : ""
                  }`}
                  data-priority={`${level}`}
                  aria-pressed={priority === level}
                  onClick={() => setPriority(level)}
                >
                  {level}
                </button>
              ))}
            </div>           
          </section>

          <section className="edit-task-page__section edit-task-page__tags-section">
            <h2 className="edit-task-page__section-title">Tag</h2>
            <div className="edit-task-page__buttons-group">
              {["Life", "Work", "Sport"].map((tag) => {
                const isActive = tags.includes(tag);
                return (
                  <button 
                    key={tag}
                    type="button" 
                    className={`tag tag--blue ${isActive ? 'tag--selected' : ''}`}
                    aria-pressed={isActive}
                    onClick={() => {
                      setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
              <button type="button" className="icon-button" aria-label="Add tag">
                <img src={AddIcon} alt="" role="presentation" />
              </button>
            </div>          
          </section>

          <section className="edit-task-page__section edit-task-page__description-section">
            <h2 className="edit-task-page__section-title">Description</h2>
            <textarea 
              type="text"               
              placeholder="Task description" 
              className="input-field"
              aria-label="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </section>

          <section className="edit-task-page__section edit-task-page__due-date-section">
            <h2 className="edit-task-page__section-title">Due date</h2>
            <input 
              type="datetime-local" 
              className="input-field input-field--date" 
              aria-label="Due date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </section>

          <button type="button" className="button upload-button"> 
            <img src={UploadImgaeIcon} alt="" role="presentation" className="button__icon" />
            <span className="button__text">Upload Image</span>
          </button>

          <div className="edit-task-page__actions">
            <button 
              type="button" 
              className="button button--warning" 
              onClick={handleCancel}
            >
              <img src={TrashIcon} alt="" role="presentation" className="button__icon" />
              <span className="button__text red">Cancel</span>
            </button>

            <button 
              className="button button--primary" 
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>      
    </main>
  );
}