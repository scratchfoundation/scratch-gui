export const getHexRegex = () => /^#?[0-9a-fA-F]{3,8}$/;

export const normalizeHex = (input) => {
  let hex = String(input);
  if (!getHexRegex().test(hex)) return "#000000";
  if (!hex.startsWith("#")) hex = `#${hex}`;
  if (hex.length === 4) {
    const [_, r, g, b] = hex;
    hex = `#${r}${r}${g}${g}${b}${b}`;
  }
  return hex.toLowerCase();
};
