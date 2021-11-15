import type { Event, Store } from 'src/store/store'
import type { Middleware } from 'src/util-types'
import { throttle } from 'lodash'

let webSocket: WebSocket

const middleware: Middleware<Store, Event> = (api) => {
  const throttledFn = throttle(() => {
    api.dispatch({ type: 'RENDER_TICK' })
  }, 250)

  return (next) => (event) => {
    if (event.type === 'DELTA_UPDATE') {
      throttledFn()
    }

    return next(event)
  }
}

export default middleware
