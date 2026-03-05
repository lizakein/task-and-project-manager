import "./ToggleButton.css";

interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function ToggleButton({
  selected,
  className = "",
  ...props
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      className={`toggle-button ${selected ? "toggle-button--selected" : ""} ${className}`}
      aria-pressed={selected}
      {...props}
    />
  );
}
