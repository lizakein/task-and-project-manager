import TaskManagerLogo from '/task-manager.svg';
import SearchIcon from '@assets/icons/ui/search-icon.svg';
import FaqIcon from '@assets/icons/actions/message-question.svg';
import NotificationIcon from '@assets/icons/actions/notification.svg';
import UserIcon from '@assets/icons/users/user-icon.svg';
import ArrowDownIcon from '@assets/icons/actions/arrow-down-icon.svg';
import MenuIcon from '@assets/icons/actions/menu-icon.svg';
import './Header.css';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const [ isSearchOpen, setIsSearchOpen ] = useState(false);

  const userName = 'Amina Agraval';

  return (
    <header className='header' role='banner'>
      <div className='header__brand'>
        <button 
          className='header__menu-button icon-button' 
          aria-label={isMenuOpen ? 'Close menu' : "Open menu"}
          onClick={onMenuToggle}
        >
          <img src={MenuIcon} alt='' role='presentation' />
        </button>

        <img 
          src={TaskManagerLogo} 
          alt="Task manager logo" 
          className='header__logo' 
        />
        <h1 className='header__title'>Project M.</h1>
      </div>

      <div className='header__actions'>
        <form
          className={`search ${isSearchOpen ? "search--open" : ""}`}
          role="search" 
          aria-label='Site search'
          onSubmit={e => e.preventDefault()}       
        >
          <button
            type='button'
            className='search__toggle icon-button'
            aria-label={isSearchOpen ? "Close search" : "Open search"}
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            <img 
              src={SearchIcon} 
              alt="" 
              role="presentation" 
              className='search__icon'
            />
          </button>
          
          <input 
            type='search'
            className='search-input'
            placeholder='Search for anything...'
            aria-label='Search'
          />
        </form>

        <div className='user-panel'>
          <button className='icon-button' aria-label='Help' type='button'>
            <img src={FaqIcon} alt="" role="presentation" />
          </button>

          <button className='icon-button' aria-label='Notifications' type='button'>
            <img src={NotificationIcon} alt="" role="presentation"/>
          </button>

          <div className='user-menu'>
            <p className='user-menu__name'>{userName}</p>
            <img 
              src={UserIcon} 
              alt={`${userName}'s avatar`}
              className='user-menu__avatar' 
            />
            <button 
              type='button'
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