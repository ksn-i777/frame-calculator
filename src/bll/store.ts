import { useDispatch } from 'react-redux'
import { combineReducers, legacy_createStore } from 'redux'
import { calculationReducer, frameReducer, pipesReducer, sheetsReducer } from 'bll/reducers'

const rootReducer = combineReducers({
  sheets: sheetsReducer,
  pipes: pipesReducer,
  frame: frameReducer,
  calculation: calculationReducer
})

export const store = legacy_createStore(rootReducer)

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = typeof store.dispatch

export const useCustomAppDispatch = useDispatch<AppDispatchType>