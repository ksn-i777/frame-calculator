export const sheetProportionsUtil = (width: number) => {
  const sheetWidthFormat = Number.isInteger(width) ? width + '.0' : width
  const sheetLength = '1.0'
  return `${sheetWidthFormat}*${sheetLength}м`
}