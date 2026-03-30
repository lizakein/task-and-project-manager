import { TAG_COLORS } from "@constants/tagColors"

export function getTagStyle(colorKey: keyof typeof TAG_COLORS) {
  const color = TAG_COLORS[colorKey];

  if (!color) {
    return {
      color: "#000",
      backgroundColor: "#fff",
      borderColor: "#00000020",
    }
  }

  return {
    color: color.text,
    backgroundColor: color.background,
    borderColor: color.border,
  };
}