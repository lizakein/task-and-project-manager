import { TAG_COLORS } from "@constants/tagColors"

export function getTagStyle(colorKey: keyof typeof TAG_COLORS) {
  return {
    color: TAG_COLORS[colorKey] || "#000"
  };
}