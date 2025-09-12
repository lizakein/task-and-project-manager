import { TAG_COLORS } from "@constants/tagColors"

export function getTagStyle(colorKey) {
  const color = TAG_COLORS[colorKey];

  return {
    color: color.text,
    backgroundColor: color.background
  };
}