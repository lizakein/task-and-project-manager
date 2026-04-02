import { TAG_COLORS } from "@constants/tagColors";
import { Tag } from "@features/tags";
import { ToggleButton } from "@ui/index";
import { getTagStyle } from "@utils/tagUtils";

interface TagButtonProps {
  tag: Tag;
  selected: boolean;
  onClick: () => void;
}

export default function TagButton({ tag, selected, onClick }: TagButtonProps) {
  const { color } = getTagStyle(tag.color as keyof typeof TAG_COLORS);

  return (
    <ToggleButton
      className={`chip tag tag--${tag.color}`}
      style={
        {
          "--tag-text": color,
        } as React.CSSProperties
      }
      selected={selected}
      onClick={onClick}
    >
      {tag.label}
    </ToggleButton>
  );
}
