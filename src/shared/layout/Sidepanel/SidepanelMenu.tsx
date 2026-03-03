import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@assets/icons/navigation/home-icon.svg";
import CalendarIcon from "@assets/icons/navigation/calendar-icon.svg";
import AnalyticsIcon from "@assets/icons/navigation/analytics-icon.svg";
import SettingsIcon from "@assets/icons/navigation/settings-icon.svg";
import { Button, Icon } from "@ui/index";

export function SidepanelMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", icon: HomeIcon, path: "/" },
    { label: "Calendar", icon: CalendarIcon, path: "/calendar" },
    { label: "Analytics", icon: AnalyticsIcon, path: "/analytics" },
    { label: "Settings", icon: SettingsIcon, path: "/settings" },
  ];

  return (
    <nav className="sidepanel__menu" aria-label="Main navigation">
      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          className={`menu-item ${
            location.pathname === item.path ? "menu-item--active" : ""
          }`}
          aria-label={`Go to ${item.label}`}
          onClick={() => navigate(item.path)}
          leftIcon={<Icon src={item.icon} className="menu-item__icon" />}
        >
          <span className="menu-item__label">{item.label}</span>
        </Button>
      ))}
    </nav>
  );
}
