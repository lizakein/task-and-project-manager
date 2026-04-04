import TaskManagerLogo from "/task-manager.svg";
import SunIcon from "@assets/icons/actions/sun-icon.svg";
import MoonIcon from "@assets/icons/actions/moon-icon.svg";
import UserIcon from "@assets/icons/users/user-icon.svg";
import ArrowDownIcon from "@assets/icons/actions/arrow-down-icon.svg";
import MenuIcon from "@assets/icons/actions/menu-icon.svg";
import { useTheme } from "@hooks/useTheme";
import { Search } from "@features/search/components/Search";
import { IconButton, Icon } from "@ui/index";
import "./Header.css";

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const userName = "Amina Agraval";

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header" role="banner">
      <div className="header__brand">
        <IconButton
          className="header__menu-button"
          ariaLabel={isMenuOpen ? "Close menu" : "Open menu"}
          icon={<Icon src={MenuIcon} />}
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
            ariaLabel="Change theme"
            icon={<Icon src={theme === "light" ? MoonIcon : SunIcon} />}
            onClick={() => toggleTheme()}
          />

          <div className="user-menu">
            <p className="user-menu__name">{userName}</p>
            <Icon
              src={UserIcon}
              alt={`${userName}'s avatar`}
              className="user-menu__avatar"
              decorative={false}
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
