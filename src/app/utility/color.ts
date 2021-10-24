import { DefaultColors } from '@src/app/enum/color.enum';

export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHex = ( rgb:{r: number, g: number, b:number}) => {
  return "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
}

export const ContrastColor = ( color: {r: number, g: number, b:number}) => {
   const luma = ((0.299 * color.r) + (0.587 * color.r) + (0.114 * color.r)) / 255;
   return luma > 0.5 ? DefaultColors.Black : DefaultColors.White;
}

const componentToHex = (c: number) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}