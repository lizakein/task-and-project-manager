import HomeIcon from '../assets/icons/home-icon.svg';
import CalendarIcon from '../assets/icons/calendar-icon.svg';
import AnalyticsIcon from '../assets/icons/analytics-icon.svg';
import SettingsIcon from '../assets/icons/settings-icon.svg';

export function SidepanelMenu() {
  return (
    <nav className="sidepanel__menu" aria-label='Main navigation'>
      <button className='menu-item' aria-label='Go to Home'>
        <img 
          src={HomeIcon} 
          alt="" 
          role="presentation"
          className='menu-item__icon' 
        />
        <span className='menu-item__label'>Home</span>
      </button>

      <button className='menu-item' aria-label='Go to Calendar'>
        <img 
          src={CalendarIcon} 
          alt="" 
          role="presentation" 
          className='manu-item__icon'  
        />
        <span className='menu-item__label'>Calendar</span>
      </button>

      <button className='menu-item' aria-label='Go to Analytics'>
        <img 
          src={AnalyticsIcon} 
          alt="" 
          role="presentation" 
          className='manu-item__icon' 
        />
        <span className='menu-item__label'>Analytics</span>
      </button>

      <button className='menu-item' aria-label='Go to Settings'>
        <img 
          src={SettingsIcon} 
          alt="" 
          role="presentation" 
          className='manu-item__icon' 
        />
        <span className='menu-item__label'>Settings</span>
      </button>
    </nav>
  );
}