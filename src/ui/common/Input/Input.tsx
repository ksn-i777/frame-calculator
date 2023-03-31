import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { errorUtil } from 'utils/errorUtil'
import styles from './Input.module.scss'

type InputPropsType = {
  isOpenBasket: boolean
  title: string
  value: number
  minInputValue: number
  maxInputValue: number
  valueStep: number
  error: string
  setError: Dispatch<SetStateAction<string>>
  changeInputValue: (newValue: number) => void
}

export const Input: FC<InputPropsType> = (
  { isOpenBasket, title, value, minInputValue, maxInputValue, valueStep, error, setError, changeInputValue }) => {

  const [localValue, setLocalValue] = useState<string>(value.toFixed(1))
  const numberLocalValue = Number(localValue)

  const onIncrementButtonClick = () => {
    if (localValue && numberLocalValue < maxInputValue) {
      setLocalValue((numberLocalValue + valueStep).toFixed(1))
    }
  }
  const onDecrementButtonClick = () => {
    if (localValue && numberLocalValue > minInputValue) {
      setLocalValue((numberLocalValue - valueStep).toFixed(1))
    }
  }
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.currentTarget.value)
  }

  useEffect(() => {
    changeInputValue(numberLocalValue)
    setError(errorUtil(numberLocalValue, minInputValue, maxInputValue))
  }, [changeInputValue, numberLocalValue, setError, minInputValue, maxInputValue])

  return (
    <div className={styles.componentContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.inputConfig}>
        <div
          className={numberLocalValue <= minInputValue || isOpenBasket ? styles.hiddenInputButton : styles.inputButton}
          onClick={onDecrementButtonClick}
        >
          -
        </div>
        <input
          disabled={isOpenBasket}
          className={styles.input}
          value={localValue}
          onChange={onInputChange}
        />
        <div
          className={numberLocalValue >= maxInputValue || isOpenBasket ? styles.hiddenInputButton : styles.inputButton}
          onClick={onIncrementButtonClick}
        >
          +
        </div>
      </div>
      {error && <div className={styles.info}>{error}</div>}
    </div>
  )
}