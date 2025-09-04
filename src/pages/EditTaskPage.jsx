import { Header } from "../components/Header";
import { Sidepanel } from "../components/Sidepanel";
import UploadImgaeIcon from "../assets/icons/ui/upload-image-icon.svg";
import TrashIcon from "../assets/icons/actions/trash-icon.svg";
import AddIcon from "../assets/icons/actions/add-square-icon.svg";
import './EditTaskPage.css';

export function EditTaskPage({ projects, setProjects }) {
  return (
    <main className='edit-task--page page'>
      <Header />
      <Sidepanel setProjects={setProjects} projects={projects} projectId={null} />

      <div className='content edit-task-page__content'>
        <input 
          type='text'
          value='New Task'
          placeholder="Task title" 
          className="edit-task-page__title-input"
          aria-label="Task title"
        />

        <form className="edit-task-page__form">
          <section className="edit-task-page__section edit-task-page__priority-section">
            <h2 className="edit-task-page__section-title">Priority</h2>
            <div className="edit-task-page__buttons-group">
              <button 
                type="button" 
                className="priority priority--low"
                data-priority="low"
                aria-pressed="false"
              >
                Low
              </button>
              <button 
                type="button" 
                className="priority priority--medium priority--selected"
                data-priority="medium"
                aria-pressed="true"
              >
                Medium
              </button>
              <button 
                type="button" 
                className="priority priority--high"
                data-priority="high"
                aria-pressed="false"
              >
                High
              </button>
            </div>           
          </section>

          <section className="edit-task-page__section edit-task-page__tags-section">
            <h2 className="edit-task-page__section-title">Tag</h2>
            <div className="edit-task-page__buttons-group">
              <button 
                type="button" 
                className="tag tag--blue" 
                aria-pressed="false"
              >
                Life
              </button>
              <button 
                type="button"
                className="tag tag--blue tag--selected" 
                aria-pressed="true"
              >
                Work
              </button>
              <button 
                type="button" 
                className="tag tag--blue" 
                aria-pressed="false"
              >
                Sport
              </button>
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
            />
          </section>

          <section className="edit-task-page__section edit-task-page__due-date-section">
            <h2 className="edit-task-page__section-title">Due date</h2>
            <input 
              type="datetime-local" 
              className="input-field input-field--date" 
              aria-label="Due date" 
            />
          </section>

          <button type="button" className="button upload-button"> 
            <img src={UploadImgaeIcon} alt="" role="presentation" className="button__icon" />
            <span className="button__text">Upload Image</span>
          </button>

          <div className="edit-task-page__actions">
            <button className="button button--warning">
              <img src={TrashIcon} alt="" role="presentation" className="button__icon" />
              <span className="button__text red">Cancel</span>
            </button>

            <button className="button button--primary" type="submit">Save</button>
          </div>
        </form>
      </div>      
    </main>
  );
}