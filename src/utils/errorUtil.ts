export const errorUtil = (numberLocalValue: number, minInputValue: number, maxInputValue: number) => {
  if(numberLocalValue < minInputValue) {
    return `минимальное значение ${minInputValue}`
  }
  if(numberLocalValue > maxInputValue) {
    return `максимальное значение ${maxInputValue}`
  }
  const valueInString = numberLocalValue.toString()
  const isLastNumberOdd = Number(valueInString[valueInString.length-1]) % 2 !== 0
  if (!Number.isInteger(numberLocalValue) && isLastNumberOdd) {
    return 'некорректное значение'
  }
  return ''
}