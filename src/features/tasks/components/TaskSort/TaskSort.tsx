import ArrowDownIcon from "@assets/icons/actions/arrow-down-icon.svg";
import SortIcon from "@assets/icons/actions/sort-icon.svg";

export function TaskSort() {
  return (
    <button type="button" className="task-controls__button">
      <img src={SortIcon} alt="" role="presentation" />
      <span className="task-controls__button-name">Sort</span>
      <img src={ArrowDownIcon} alt="" role="presentation" />
    </button>
  );
}
