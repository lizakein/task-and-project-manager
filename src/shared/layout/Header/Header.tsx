import TaskManagerLogo from "/task-manager.svg";
import FaqIcon from "@assets/icons/actions/message-question.svg";
import NotificationIcon from "@assets/icons/actions/notification.svg";
import UserIcon from "@assets/icons/users/user-icon.svg";
import ArrowDownIcon from "@assets/icons/actions/arrow-down-icon.svg";
import MenuIcon from "@assets/icons/actions/menu-icon.svg";
import { Search } from "./Search";
import { IconButton, Icon } from "@ui/index";
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
        <IconButton
          className="header__menu-button"
          ariaLabel={isMenuOpen ? "Close menu" : "Open menu"}
          icon={<img src={MenuIcon} />}
          onClick={onMenuToggle}
        />

        <Icon
          src={TaskManagerLogo}
          alt="Task manager logo"
          className="header__logo"
          decorative={false}
        />
        <h1 className="header__title">Project M.</h1>
      </div>

      <div className="header__actions">
        <Search />

        <div className="user-panel">
          <IconButton
            className="icon-button"
            ariaLabel="Help"
            icon={<Icon src={FaqIcon} />}
          />

          <IconButton
            className="icon-button"
            ariaLabel="Notifications"
            icon={<Icon src={NotificationIcon} />}
          />

          <div className="user-menu">
            <p className="user-menu__name">{userName}</p>
            <Icon
              src={UserIcon}
              alt={`${userName}'s avatar`}
              className="user-menu__avatar"
              decorative={false}
              size="2rem"
            />
            <IconButton
              className="user-menu__toggle"
              ariaLabel="Open profile menu"
              icon={<Icon src={ArrowDownIcon} />}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
