import React, { ChangeEvent, FC } from 'react'
import styles from './Select.module.scss'

type SelectPropsType = {
  isOpenBasket: boolean
  title: string
  options: any[]
  currentValue: string
  setCurrentValue: (value: string) => void
}

export const Select: FC<SelectPropsType> = React.memo(({ isOpenBasket, title, options, currentValue, setCurrentValue }) => {

  const mappedOptions = options.map(option => <option key={option.key} value={option.key}>{option.name}</option>)

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentValue(event.currentTarget.value)
  }

  return (
    <div className={styles.componentContainer}>
      <div className={styles.title}>{title}</div>
      <select disabled={isOpenBasket} className={styles.select} value={currentValue} onChange={onSelectChange}>
        <option hidden>Выбрать</option>
        {mappedOptions}
      </select>
    </div>
  )
})