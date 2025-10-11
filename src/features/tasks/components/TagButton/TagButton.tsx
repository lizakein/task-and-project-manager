import { TAG_COLORS } from "@constants/tagColors";
import { Tag } from "@features/tags";
import { getTagStyle } from "@utils/tagUtils";

interface TagButtonProps {
  tag: Tag;
  selected: boolean;
  onClick: () => void;
};

export function TagButton({ tag, selected, onClick }: TagButtonProps) {
  const { color, backgroundColor } = getTagStyle(
    tag.color as keyof typeof TAG_COLORS
  );

  return (
    <button 
      type="button" 
      className={`tag tag--${tag.color} ${selected ? 'tag--selected' : ''}`}
      style={{
        "--tag-text": color,
        "--tag-bg": backgroundColor
      } as React.CSSProperties}
      aria-pressed={selected}
      onClick={onClick}
    >
      {tag.label}
    </button>
  );
}