import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import type { Dispatch } from 'react'
import * as reactRedux from 'react-redux'
import mainReducer, { MainSlice, MainEvent } from './slices/main'
import feedMiddleware from './effects/feed'
import throttleMiddleware from './effects/throttler'
import focusHandler from './effects/focusHandler'
import toggleProductId from './effects/toggleProductId'

// ...and this is a collection of the slices
export type AppStore = {
  main: MainSlice
}

// Export generic names for the middleware consumption
export type Store = AppStore
export type Event = MainEvent

// Typed hooks to get typed selector results...
export const useSelector: reactRedux.TypedUseSelectorHook<AppStore> =
  reactRedux.useSelector

// ...and only accept valid event dispatches
export const useDispatch = () => reactRedux.useDispatch<Dispatch<Event>>()

export default createStore<Store, Event, {}, {}>(
  combineReducers({
    main: mainReducer
  }),
  composeWithDevTools(
    applyMiddleware(
      feedMiddleware,
      throttleMiddleware,
      focusHandler,
      toggleProductId
    )
  )
)
