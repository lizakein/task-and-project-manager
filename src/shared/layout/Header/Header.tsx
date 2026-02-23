import TaskManagerLogo from "/task-manager.svg";
import FaqIcon from "@assets/icons/actions/message-question.svg";
import NotificationIcon from "@assets/icons/actions/notification.svg";
import UserIcon from "@assets/icons/users/user-icon.svg";
import ArrowDownIcon from "@assets/icons/actions/arrow-down-icon.svg";
import MenuIcon from "@assets/icons/actions/menu-icon.svg";
import { Search } from "./Search";
import "./Header.css";

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const userName = "Amina Agraval";

  return (
    <header className="header" role="banner">
      <div className="header__brand">
        <button
          className="header__menu-button icon-button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={onMenuToggle}
        >
          <img src={MenuIcon} alt="" role="presentation" />
        </button>

        <img
          src={TaskManagerLogo}
          alt="Task manager logo"
          className="header__logo"
        />
        <h1 className="header__title">Project M.</h1>
      </div>

      <div className="header__actions">
        <Search />

        <div className="user-panel">
          <button className="icon-button" aria-label="Help" type="button">
            <img src={FaqIcon} alt="" role="presentation" />
          </button>

          <button
            className="icon-button"
            aria-label="Notifications"
            type="button"
          >
            <img src={NotificationIcon} alt="" role="presentation" />
          </button>

          <div className="user-menu">
            <p className="user-menu__name">{userName}</p>
            <img
              src={UserIcon}
              alt={`${userName}'s avatar`}
              className="user-menu__avatar"
            />
            <button
              type="button"
              className="icon-button user-menu__toggle"
              aria-label="Open profile menu"
            >
              <img src={ArrowDownIcon} alt="" role="presentation" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
