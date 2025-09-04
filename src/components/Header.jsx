import TaskManagerLogo from '/task-manager.svg';
import SearchIcon from '../assets/icons/ui/search-icon.svg';
import FaqIcon from '../assets/icons/actions/message-question.svg';
import NotificationIcon from '../assets/icons/actions/notification.svg';
import UserIcon from '../assets/icons/users/user-icon.svg';
import ArrowDownIcon from '../assets/icons/actions/arrow-down-icon.svg';
import './Header.css';

export function Header() {
  const userName = 'Amina Agraval';

  return (
    <header className='header'>
      <div className='header__brand'>
        <img 
          src={TaskManagerLogo} 
          alt="Task manager logo" 
          className='header__logo' 
        />
        <h1 className='header__title'>Project M.</h1>
      </div>

      <div className='header__actions'>
        <form
          className='search' 
          role="search" 
          aria-label='Site search'
        >
          <img 
            src={SearchIcon} 
            alt="" 
            role="presentation" 
            className='search__icon'
          />
          <input 
            type='search'
            className='search-input'
            placeholder='Seacrh for anything...'
            aria-label='Search'
          />
        </form>

        <div className='user-panel'>
          <button className='icon-button' aria-label='Help'>
            <img src={FaqIcon} alt="" role="presentation" />
          </button>

          <button className='icon-button' aria-label='Notifications'>
            <img src={NotificationIcon} alt="" role="presentation"/>
          </button>

          <div className='user-menu'>
            <h2 className='user-menu__name'>{userName}</h2>
            <img 
              src={UserIcon} 
              alt={`${userName}'s avatar`}
              className='user-menu__avatar' 
            />
            <button 
              className='icon-button user-menu__toggle' 
              aria-label='Open profile menu'
            > 
              <img src={ArrowDownIcon} alt="" role="presentation" />
            </button>
          </div>
        </div>       
      </div>    
    </header>
  );
}