export const getNewSortConditionUtil = (sortCondition: string) => {
  return sortCondition === '' ? 'asc' : sortCondition === 'asc' ? 'desc' : ''
}